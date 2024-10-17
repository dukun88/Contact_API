//import express
const express = require('express');

//init express router
const router = express.Router();

//import contactController
const contactController = require('./handlers');
const { validateContacts } = require('./validators');

//define route for contacts
router.get('/contacts', contactController.findContacts);
router.post('/contacts', validateContacts, contactController.addContact);
router.get('/contacts/:id', contactController.findcontactById);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);
//export router
module.exports = router;
