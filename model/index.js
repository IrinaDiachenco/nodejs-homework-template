const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')
const shortid = require('shortid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => { 
  const contacts = await fs.readFile(contactsPath)
  const parsedContacts = JSON.parse(contacts)
  return parsedContacts
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(({ id }) => id == contactId)
    console.log(contact)
    return contact
  }
  catch (err) {
    console.log(err.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const newList = contacts.filter((contact) => contact.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newList))
  return newList
  }
  catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  
  try {
    const contacts = await listContacts()
    const id = shortid.generate()
    const newContact = {id, body}
		const newList = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newList))
  
    return newContact
    
    }
    catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contact = await getContactById(contactId)
    const updatedContact = Object.assign(contact, body)
    const newList = contacts.map(contact => {
      if (contact.id != contactId) {
        return contact
      }
      return (contact = {...updatedContact})
    })
    await fs.writeFile(contactsPath, JSON.stringify(newList))

    return updatedContact
  }
  catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}