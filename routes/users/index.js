const express = require('express')
const router = express.Router()
const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser
} = require('../../controllers/users')
const { validateSignupUser, validateLoginUser } = require('./validation')
const guard = require('../../helpers/guard')

router.post('/signup', validateSignupUser, signupUser)
router.post('/login', validateLoginUser, loginUser)
router.post('/logout', guard, logoutUser)
router.get('/current', guard, getCurrentUser)

module.exports = router
