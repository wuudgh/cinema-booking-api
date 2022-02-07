const express = require("express");
const { newScreen } = require("../controllers/screen");

const router = express.Router();

router.post("/", newScreen);

module.exports = router;
