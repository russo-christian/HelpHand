const Contact = require("../models/contact.model");

const contactController = {
  // Post a new contact
  createContact: async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).send(newContact);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Retrieve a contact by id
  getContactById: async (req, res) => {
    try {
      console.log(req.params.id);
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).send("Contact not found");
      }
      res.send(contact);
    } catch (error) {
      res.status(500).send({ message: error.message, stack: error.stack });
    }
  },
};

module.exports = contactController;
