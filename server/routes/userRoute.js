const USER = require("../models/userModel");

const { postSingUp, postLogin } = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/singup", postSingUp);

router.post("/login", postLogin);

module.exports = router;
