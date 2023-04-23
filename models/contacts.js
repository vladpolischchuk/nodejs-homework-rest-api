const { v4: uuidv4 } = require("uuid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;

};

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contactById = contacts.find((contact) => contact.id === contactId.toString());
  if (!contactById) {
    return null;
  };

  return contactById;
};

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId.toString());
  if (index === -1) {
    return null;
  };

  const newContact = contacts.filter((contact) => contact.id !== contactId.toString());
  await fs.writeFile(contactsPath, JSON.stringify(newContact));

  return contacts[index];

};

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

async function updateContact(id, { name, email, phone }) {
  const contacts = await listContacts();

  const updateListContacts = contacts.map((contact) => {
    if (contact.id !== id) {
      return { ...contact };
    };

    return {
      id,
      name,
      email,
      phone,
    };
  });

  await fs.writeFile(contactsPath, JSON.stringify(updateListContacts));
  return updateListContacts.find((contact) => contact.id === id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
