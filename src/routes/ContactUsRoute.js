const router = require("express").Router();
const { contactUsDetails } = require("../controllers/ContactUsController");

router.post("/", contactUsDetails);
module.exports = router;
