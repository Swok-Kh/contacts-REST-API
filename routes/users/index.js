const express = require('express')
const router = express.Router()
const upload = require('../../helpers/upload-avatars')

const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  verifyUserEmail
} = require('../../controllers/users')
const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateUserSubscription
} = require('./validation')
const guard = require('../../helpers/guard')

router.patch('/', guard, validateUpdateUserSubscription, updateUserSubscription)
router.post('/signup', validateSignupUser, signupUser)
router.post('/login', validateLoginUser, loginUser)
router.post('/logout', guard, logoutUser)
router.get('/current', guard, getCurrentUser)
router.patch('/avatars', guard, upload.single('avatar'), updateUserAvatar)
router.get('/verify/:verificationToken', verifyUserEmail)

module.exports = router
