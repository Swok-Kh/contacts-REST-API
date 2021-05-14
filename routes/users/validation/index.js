const Joi = require('joi')
const validate = require('../../../helpers/validate')
const { subscription } = require('../../../helpers/constants')

const signupUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
})

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const updateSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(subscription.STARTER, subscription.PRO, subscription.BUSINESS)
    .required()
})

const validateSignupUser = (req, res, next) => {
  validate(signupUserSchema, req.body, next)
}

const validateLoginUser = (req, res, next) => {
  validate(loginUserSchema, req.body, next)
}

const validateUpdateUserSubscription = (req, res, next) => {
  validate(updateSubscriptionUser, req.body, next)
}
module.exports = {
  validateSignupUser,
  validateLoginUser,
  validateUpdateUserSubscription
}
