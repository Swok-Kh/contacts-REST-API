const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')
const { httpCodes } = require('./helpers/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(httpCodes.NOT_FOUND).json({
    status: 'error',
    code: httpCodes.NOT_FOUND,
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const code = err.code || httpCodes.INTERNAL_ERROR
  res.status(code).json({
    status: code === httpCodes.INTERNAL_ERROR ? 'fail' : 'error',
    code: code,
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong'
  })
})

module.exports = app
