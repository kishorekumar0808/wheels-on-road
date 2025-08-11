const router = require("express").Router();
const authenticate = require("../middlewares/Authentication");
const { contactUsDetails } = require("../controllers/ContactUsController");

router.post("/", authenticate, contactUsDetails);
module.exports = router;
