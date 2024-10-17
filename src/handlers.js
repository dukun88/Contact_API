//import PrismaClient
const { PrismaClient } = require('@prisma/client');

//init prisma client
const prisma = new PrismaClient();
// Import validationResult from express-validator
const { validationResult } = require('express-validator');

//function findcontacts
const findContacts = async (req, res) => {
  try {
    //get all contacts from database
    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        name: true,
        whatsapp: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: 'Get All contacts Successfully',
      data: contacts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

const addContact = async (req, res) => {
  // Periksa hasil validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan error ke pengguna
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    //insert data
    const contact = await prisma.contact.create({
      data: {
        name: req.body.name,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
      },
    });

    res.status(201).send({
      success: true,
      message: 'contact Created Successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

//function findcontactById
const findcontactById = async (req, res) => {
  //get ID from params
  const { id } = req.params;

  try {
    //get contact by ID
    const contact = await prisma.contact.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        whatsapp: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: `Get contact By ID :${id}`,
      data: contact,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

//function updatecontact
const updateContact = async (req, res) => {
  //get ID from params
  const { id } = req.params;

  // Periksa hasil validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan error ke pengguna
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    //update contact
    const contact = await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        name: req.body.name,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        updatedAt: new Date(),
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: 'contact Updated Successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};
//function deletecontact
const deleteContact = async (req, res) => {
  //get ID from params
  const { id } = req.params;

  try {
    //delete contact
    await prisma.contact.delete({
      where: {
        id: id,
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: 'contact Deleted Successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

//export function
module.exports = {
  findContacts,
  addContact,
  findcontactById,
  updateContact,
  deleteContact,
};
