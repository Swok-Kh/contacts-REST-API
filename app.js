const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const boolParser = require('express-query-boolean')
const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')
const { httpCodes } = require('./helpers/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    return res.status(httpCodes.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: httpCodes.TOO_MANY_REQUESTS,
      message: 'Too Many Requests, Try Later'
    })
  }
})

app.use(helmet())
app.use(logger(formatsLogger))
app.use(limiter)
app.use(cors())
app.use(express.json())
app.use(boolParser())

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
