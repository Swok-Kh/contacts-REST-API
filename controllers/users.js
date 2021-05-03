const usersModel = require('../model/users')
const { httpCodes } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const signupUser = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await usersModel.findByEmail(email)
    if (user) {
      return res.status(httpCodes.CONFLICT).json({
        status: 'conflict',
        code: httpCodes.CONFLICT,
        message: 'Email is already use'
      })
    }
    const newUser = await usersModel.create(req.body)
    return res.status(httpCodes.CREATED).json({
      status: 'created',
      code: httpCodes.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription
      }
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await usersModel.findByEmail(email)
    const isValidPassword = await user?.validatePassword(password)
    if (!user || !isValidPassword) {
      return res.status(httpCodes.UNAUTHORIZED).json({
        status: 'error',
        code: httpCodes.UNAUTHORIZED,
        message: 'Invalid credential'
      })
    }
    const payload = { id: user._id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await usersModel.updateToken(user._id, token)
    return res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: {
        token,
        user: { email: user.email, subscription: user.subscription }
      }
    })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const id = req.user.id
    await usersModel.updateToken(id, null)
    return res.status(httpCodes.NO_CONTENT).json({})
  } catch (error) {
    next(error)
  }
}

const getCurrentUser = async (req, res, next) => {
  try {
    const {
      user: { email, subscription }
    } = req
    return res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: { email, subscription }
    })
  } catch (error) {
    next(error)
  }
}

const updateSubscriptionUser = async (req, res, next) => {
  try {
    const {
      user: { _id },
      body: { subscription }
    } = req

    const user = await usersModel.updateSubscription(_id, subscription)
    return res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: { email: user.email, subscription: user.subscription }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscriptionUser
}
