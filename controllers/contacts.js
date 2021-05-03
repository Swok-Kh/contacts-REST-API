const contactsModel = require('../model/contacts')
const { httpCodes } = require('../helpers/constants')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const contacts = await contactsModel.getAll(userId, req.query)
    res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: contacts
    })
  } catch (error) {
    next(error)
  }
}

const getOneContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const userId = req.user?._id
    const contact = await contactsModel.getOneById(userId, contactId)
    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: contact
      })
    } else {
      res.status(httpCodes.NOT_FOUND).json({
        status: 'error',
        code: httpCodes.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

const addOneContact = async (req, res, next) => {
  try {
    const { body } = req
    const userId = req.user?._id
    const contact = await contactsModel.addOne(userId, body)
    res.status(httpCodes.CREATED).json({
      status: 'success',
      code: httpCodes.CREATED,
      data: contact
    })
  } catch (error) {
    next(error)
  }
}

const removeOneContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const userId = req.user?._id
    const contact = await contactsModel.removeOneById(userId, contactId)

    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        message: 'contact deleted',
        data: contact
      })
    } else {
      res.status(httpCodes.NOT_FOUND).json({
        status: 'error',
        code: httpCodes.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateOneContact = async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body
    } = req
    const userId = req.user?._id
    const contact = await contactsModel.updateOne(userId, contactId, body)
    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: contact
      })
    } else {
      res.status(httpCodes.NOT_FOUND).json({
        status: 'error',
        code: httpCodes.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateContactFavorite = async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body
    } = req
    const userId = req.user?._id
    const contact = await contactsModel.updateOne(userId, contactId, body)
    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: contact
      })
    } else {
      res.status(httpCodes.NOT_FOUND).json({
        status: 'error',
        code: httpCodes.NOT_FOUND,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllContacts,
  getOneContactById,
  removeOneContactById,
  addOneContact,
  updateContactFavorite,
  updateOneContact
}
