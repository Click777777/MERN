const USER = require("../models/userModel");

var jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

const postSingUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const document = await USER.singup(email, password);
    const token = createToken(document._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const document = await USER.login(email, password);
    const token = createToken(document._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postSingUp,
  postLogin,
};
