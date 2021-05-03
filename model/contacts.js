const Contact = require('./schemas/contact')

const getAll = async () => await Contact.find()

const getOneById = async contactId => await Contact.findById(contactId)

const addOne = async body => await Contact.create({ ...body })

const removeOneById = async contactId =>
  await Contact.findByIdAndDelete(contactId)

const updateOne = async (contactId, body) =>
  await Contact.findByIdAndUpdate(contactId, body, {
    new: true
  })

module.exports = { getAll, getOneById, addOne, removeOneById, updateOne }
