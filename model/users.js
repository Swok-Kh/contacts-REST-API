const User = require('./schemas/user')

const findById = async id => await User.findById(id)

const findByEmail = async email => await User.findOne({ email })

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

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription
}
