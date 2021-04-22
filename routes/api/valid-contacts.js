const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(1).max(40).required(),
  phone: Joi.string().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().min(1).max(40).optional(),
  phone: Joi.number().optional(),
}).or('name', 'email', 'phone')

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)
    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  validationAddContact: async (req, res, next) => {
    return await validate(schemaAddContact, req.body, next)
  },
  validationUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  },
}
