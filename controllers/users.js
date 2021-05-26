const fs = require('fs/promises')
const path = require('path')
const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')
const usersModel = require('../model/users')
const { httpCodes } = require('../helpers/constants')

require('dotenv').config()
const { JWT_SECRET_KEY } = process.env

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'marjolaine1@ethereal.email',
    pass: '74BQ332aEF9kzNmkSm'
  }
})

const signupUser = async (req, res, next) => {
  try {
    const { email: checkedEmail } = req.body
    const user = await usersModel.findByEmail(checkedEmail)
    if (user) {
      return res.status(httpCodes.CONFLICT).json({
        status: 'conflict',
        code: httpCodes.CONFLICT,
        message: 'Email is already use'
      })
    }
    const verifyToken = uuidv4()

    const { email, subscription, avatarURL } = await usersModel.create({
      ...req.body,
      verifyToken
    })

    await transporter.sendMail({
      from: '<no-reply@ethereal.email>',
      to: checkedEmail,
      subject: 'Email verification',
      text: 'Email verification',
      html: `<b>Email verification:</b><a href='http://localhost/users/verify/${verifyToken}'>verify your email</>`
    })

    return res.status(httpCodes.CREATED).json({
      status: 'created',
      code: httpCodes.CREATED,
      data: { email, subscription, avatarURL }
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await usersModel.findByEmail(email)
    if (!user.verify) {
      return res.status(httpCodes.BAD_REQUEST).json({
        status: 'error',
        code: httpCodes.BAD_REQUEST,
        message: 'Email not verified'
      })
    }
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
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

const verifyUserEmail = async (req, res, next) => {
  const { verificationToken } = req.params

  if (!verificationToken) {
    return res.status(httpCodes.BAD_REQUEST).json({
      status: 'error',
      code: httpCodes.BAD_REQUEST,
      message: 'No verification token'
    })
  }

  const user = await usersModel.findByVerifyToken(verificationToken)

  if (!user) {
    return res.status(httpCodes.NOT_FOUND).json({
      status: 'error',
      code: httpCodes.NOT_FOUND,
      message: 'User not found'
    })
  }

  await usersModel.setVerify(user._id)

  return res.status(httpCodes.OK).json({
    status: 'success',
    code: httpCodes.OK,
    message: 'Verification successful'
  })
}

const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user
    await usersModel.updateToken(id, null)
    return res.status(httpCodes.NO_CONTENT).json({})
  } catch (error) {
    next(error)
  }
}

const getCurrentUser = async (req, res, next) => {
  try {
    const {
      user: { email, subscription, avatarURL }
    } = req
    return res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: { email, subscription, avatarURL }
    })
  } catch (error) {
    next(error)
  }
}

const updateUserSubscription = async (req, res, next) => {
  try {
    const {
      user: { _id },
      body: { subscription: newSubscription }
    } = req

    const { email, subscription, avatarURL } =
      await usersModel.updateSubscription(_id, newSubscription)
    return res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: { email, subscription, avatarURL }
    })
  } catch (error) {
    next(error)
  }
}

const updateUserAvatar = async (req, res, next) => {
  try {
    const { id, email, subscription } = req.user
    const avatarURL = await saveUserAvatar(req)
    await usersModel.updateAvatar(id, avatarURL)

    return res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: { email, subscription, avatarURL }
    })
  } catch (error) {
    next(error)
  }
}

const saveUserAvatar = async ({ file, user }) => {
  const { AVATARS_FOLDER } = process.env
  const filePath = file.path

  const img = await jimp.read(filePath)
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(filePath)

  try {
    const oldAvatar = user.avatarURL
    if (oldAvatar.includes(`${AVATARS_FOLDER}/`)) {
      await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
    }
  } catch (e) {
    if (e.message.includes('no such file or directory')) {
      console.log(e.message)
    } else {
      throw new Error(e.message)
    }
  }

  const newFileName = `${user.id}${path.extname(file.originalname)}`
  try {
    await fs.rename(
      filePath,
      path.join(process.cwd(), 'public', AVATARS_FOLDER, newFileName)
    )
  } catch (e) {
    throw new Error(e.message)
  }

  return path.join(AVATARS_FOLDER, newFileName).replace('\\', '/')
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  verifyUserEmail
}
