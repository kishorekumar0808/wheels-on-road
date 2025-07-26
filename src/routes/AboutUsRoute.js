const { getAboutUs } = require("../controllers/AboutUsController");

const router = require("express").Router();

router.get("/", getAboutUs);

module.exports = router;
