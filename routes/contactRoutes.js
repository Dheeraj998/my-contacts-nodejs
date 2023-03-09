const express = require("express");
const {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;
