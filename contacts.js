const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.resolve("./db/contacts.json");
const textFormat = "utf8";

async function listContacts() {
  const response = await fs.readFile(contactPath, textFormat);
  const data = JSON.parse(response);
  console.table(data);
}

async function getContactById(contactId) {
  const response = await fs.readFile(contactPath, textFormat);
  const data = JSON.parse(response);
  console.table(data.filter((item) => item.id === contactId));
}

async function removeContact(contactId) {
  const response = await fs.readFile(contactPath, textFormat);
  const data = JSON.parse(response);

  if (!data.find((item) => item.id === contactId)) {
    console.log(`Failed to delete contact with ID '${contactId}'!`.red);
  } else {
    const newData = data.filter((item) => item.id !== contactId);

    await fs.writeFile(contactPath, JSON.stringify(newData), textFormat);
    listContacts();
  }
}

async function addContact(name, email, phone) {
  const response = await fs.readFile(contactPath, textFormat);
  const data = JSON.parse(response);

  if (data.find((item) => item.name === name)) {
    console.log(`A contact with name '${name}' is already exists!`);
  } else {
    const id = nanoid();
    const newContact = { id, name, email, phone };

    data.push(newContact);

    await fs.writeFile(contactPath, JSON.stringify(data), textFormat);
    listContacts();
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
