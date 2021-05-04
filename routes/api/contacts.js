const express = require('express')
const router = express.Router() 
const Contacts = require('../../model/index')
const {validationAddContact, validationUpdateContact} = require('./valid-contacts')

router.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
    try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    // const {name, email, phone} = body
    const contact = await Contacts.addContact(req.body)
    if (!contact) {
      return res.status(400).json({
        code: 400,
        data: {
          message: 'missing required field',
        },
      });
    } else {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
      try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {

    const contact = await Contacts.updateStatusContact(req.params.contactId, req.body);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router