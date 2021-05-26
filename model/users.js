const User = require('./schemas/user')

const findById = async id => await User.findById(id)

const findByEmail = async email => await User.findOne({ email })

const findByVerifyToken = async verifyToken =>
  await User.findOne({ verifyToken })

const setVerify = async id =>
  await User.findByIdAndUpdate(id, { verify: true, verifyToken: null })

const create = async userOptions => {
  const user = new User(userOptions)
  return await user.save()
}

const updateToken = async (id, token) =>
  await User.findByIdAndUpdate(id, { token })

const updateSubscription = async (id, subscription) =>
  await User.findByIdAndUpdate(
    id,
    { subscription },
    {
      new: true
    }
  )

const updateAvatar = async (id, avatarURL) =>
  await User.findByIdAndUpdate(
    id,
    { avatarURL },
    {
      new: true
    }
  )

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
  setVerify
}
