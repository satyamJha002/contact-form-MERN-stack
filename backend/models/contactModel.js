const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter the first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter the last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter the mobile number"],
  },
  companyName: {
    type: String,
    required: [true, "Please enter the company name"],
  },
  jobTitle: {
    type: String,
    required: [true, "Please enter job role."],
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
