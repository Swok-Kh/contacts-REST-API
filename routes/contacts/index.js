const express = require('express')
const router = express.Router()
const {
  getAllContacts,
  getOneContactById,
  addOneContact,
  removeOneContactById,
  updateOneContact,
  updateContactFavorite
} = require('../../controllers/contacts')
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
  validateContactId
} = require('./validation')
const guard = require('../../helpers/guard')

router
  .get('/', guard, getAllContacts)
  .post('/', guard, validateCreateContact, addOneContact)

router
  .get('/:contactId', guard, validateContactId, getOneContactById)
  .delete('/:contactId', guard, validateContactId, removeOneContactById)
  .put(
    '/:contactId',
    guard,
    validateContactId,
    validateUpdateContact,
    updateOneContact
  )

router.patch(
  '/:contactId/favorite',
  guard,
  validateContactId,
  validateUpdateContactFavorite,
  updateContactFavorite
)

module.exports = router
