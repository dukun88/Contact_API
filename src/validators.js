//import express validator
const { body } = require('express-validator');

//definisikan validasi untuk contact
const validateContacts = [
  body('name').notEmpty().withMessage('Name is required'),
  body('whatsapp').notEmpty().withMessage('Whatsapp is required'),
  body('email').notEmpty().withMessage('Email is required'),
];

module.exports = { validateContacts };
