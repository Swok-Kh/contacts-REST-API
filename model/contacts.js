const Contact = require('./schemas/contact')

const getAll = async (userId, query) => {
  const { favorite, page = 1, limit = 10 } = query

  const opt = { owner: userId }
  if (favorite) opt.favorite = favorite
  return await Contact.paginate(opt, {
    page,
    limit,
    populate: {
      path: 'owner',
      select: 'email subscription'
    }
  })
}

const getOneById = async (userId, contactId) =>
  await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription'
  })

const addOne = async (userId, body) =>
  await Contact.create({ ...body, owner: userId })

const removeOneById = async (userId, contactId) =>
  await Contact.findOneAndDelete({ _id: contactId, owner: userId })

const updateOne = async (userId, contactId, body) =>
  await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
    new: true
  }).populate({
    path: 'owner',
    select: 'email subscription'
  })

module.exports = { getAll, getOneById, addOne, removeOneById, updateOne }
