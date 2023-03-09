//async upayogikkumbol try catch payogikkendi varum,ith reduce cheyyan ulla package(ivide nammal mongodb anu upayogikkunnath)
const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
  // res.status(200).json({ message: "Get all contacts" });
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    //ingane koduth kazhinjal html form ilula error anu povuka ith ozhivakkan oru custom middleware upayogikkuka errorandle.js
    throw new Error("all fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  // console.log(req.body);
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: `Get  contact for ${req.params.id}` });
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: `update  contact for ${req.params.id}` });
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user dont have prermission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: `delete  contact for ${req.params.id}` });
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user dont have prermission to delete other user contacts");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
