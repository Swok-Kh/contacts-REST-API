const Joi = require('joi')

const createContactShema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[(][0-9]{1,4}[)][\s][0-9]{3}[-][0-9]{4}$/, 'phone')
    .required()
})

const updateContactShema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^[(][0-9]{1,4}[)][\s][0-9]{3}[-][0-9]{4}$/,
    'phone'
  )
}).or('name', 'email', 'phone')

const validate = async (shema, value, next) => {
  try {
    await shema.validateAsync(value)
    next()
  } catch (error) {
    next({ code: 400, message: error.message.replace(/"/g, "'") })
  }
}

const validateCreateContact = (req, res, next) => {
  validate(createContactShema, req.body, next)
}

const validateUpdateContact = (req, res, next) => {
  validate(updateContactShema, req.body, next)
}

module.exports = { validateCreateContact, validateUpdateContact }
