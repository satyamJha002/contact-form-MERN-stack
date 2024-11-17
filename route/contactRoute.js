const express = require("express");
const {
  createContact,
  getContactDetails,
  updateContactDetails,
  deleteContact,
  getContactById,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/contacts").post(createContact).get(getContactDetails);

router
  .route("/contacts/:id")
  .put(updateContactDetails)
  .delete(deleteContact)
  .get(getContactById);

module.exports = router;
