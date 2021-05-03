const express = require('express')
const router = express.Router()
const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscriptionUser
} = require('../../controllers/users')
const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubscriptionUser
} = require('./validation')
const guard = require('../../helpers/guard')

router.patch('/', guard, validateUpdateSubscriptionUser, updateSubscriptionUser)
router.post('/signup', validateSignupUser, signupUser)
router.post('/login', validateLoginUser, loginUser)
router.post('/logout', guard, logoutUser)
router.get('/current', guard, getCurrentUser)

module.exports = router
