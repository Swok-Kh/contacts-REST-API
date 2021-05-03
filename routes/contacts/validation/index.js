const Joi = require('joi')
const mongoose = require('mongoose')
const validate = require('../../../helpers/validate')

const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[(][0-9]{1,4}[)][\s][0-9]{3}[-][0-9]{4}$/, 'phone')
    .required(),
  favorite: Joi.boolean().required()
})

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^[(][0-9]{1,4}[)][\s][0-9]{3}[-][0-9]{4}$/,
    'phone'
  ),
  favorite: Joi.boolean()
}).or('name', 'email', 'phone', 'favorite')

const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const validateCreateContact = (req, res, next) => {
  validate(createContactSchema, req.body, next)
}

const validateUpdateContact = (req, res, next) => {
  validate(updateContactSchema, req.body, next)
}

const validateUpdateContactFavorite = (req, res, next) => {
  validate(updateContactFavoriteSchema, req.body, next)
}

const validateContactId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return next({ code: 400, message: 'Invalid ID' })
  }
  next()
}

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
  validateContactId
}
