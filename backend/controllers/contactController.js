const Contact = require("../models/contactModel");

const createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, companyName, jobTitle } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !companyName ||
      !jobTitle
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All filled are required fields" });
    }

    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: "A contact with the email already exist",
      });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      jobTitle,
    });

    await newContact.save();

    res.status(201).json({ success: true, newContact });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ messge: "Duplicate entry for email" });
    } else {
      next(error);
    }
  }
};

const getContactDetails = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    if (!contacts) {
      res.status(404).json({ success: false, message: "Contacts not found" });
    }

    res.status(200).json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
};

const updateContactDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updateContact = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updateContact) {
      return res
        .status(404)
        .json({ success: false, message: "A contact not found" });
    }

    res.status(200).json({ success: true, updateContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Contact details deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const findContactById = await Contact.findById(id);

    if (!findContactById) {
      return res
        .status(404)
        .json({ success: false, message: "Not found by this id" });
    }

    res.status(200).json({ success: true, findContactById });
  } catch (error) {
    res.status(500).json({ success: false });
    next(error);
  }
};

module.exports = {
  createContact,
  getContactDetails,
  updateContactDetails,
  deleteContact,
  getContactById,
};
