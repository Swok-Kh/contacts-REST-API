const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { subscription } = require('../../helpers/constants')
const gravatar = require('gravatar')

require('dotenv').config()
const { SALT_FACTOR } = process.env

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    subscription: {
      type: String,
      enum: {
        values: [...Object.values(subscription)],
        message: 'Non-existent subscription type'
      },
      default: subscription.STARTER
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      }
    },
    verify: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required']
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(+SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
