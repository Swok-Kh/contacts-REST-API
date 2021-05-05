const { httpCodes } = require('./constants')

const validate = async (schema, value, next) => {
  try {
    await schema.validateAsync(value)
    next()
  } catch (error) {
    next({
      code: httpCodes.BAD_REQUEST,
      message: error.message.replace(/"/g, "'")
    })
  }
}

module.exports = validate
