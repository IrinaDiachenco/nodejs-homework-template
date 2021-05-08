const express = require('express')
const router = express.Router() 
const ctrl = require('../../controllers/contacts')
const {validationAddContact, validationUpdateContact} = require('./valid-contacts')
const guard = require('../../helpers/guard')

router.get('/', guard, ctrl.getAll)

router.get('/:contactId', guard, ctrl.getById)

router.post('/', guard, validationAddContact, ctrl.addContact)

router.delete('/:contactId', guard, ctrl.removeContact)

router.patch('/:contactId', guard, validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', guard, ctrl.updateStatusContact)

module.exports = router
