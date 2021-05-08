const Contacts = require('../model/index')
const { HttpCode } = require('../helpers/constants')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    })
  } catch (e) {
    next(e)
  }
}

const getById =  async (req, res, next) => {
    try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    if (!contact) {
      return res.status(400).json({
        code: HttpCode.BAD_REQUEST,
        data: {
          message: 'missing required field',
        },
      });
    } else {
      return res.status(201).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: {
          contact,
        },
      })
    }
  } catch (e) {
    next(e)
  }
}

const removeContact =  async (req, res, next) => {
      try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateContact =  async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateStatusContact =  async (req, res, next) => {
  try {
    const contact = await Contacts.updateStatusContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}