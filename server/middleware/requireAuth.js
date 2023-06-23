const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("error");
    return res.status(401).json({ error: "Authorization token Required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await USER.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Req isn't authorized" });
  }
};

module.exports = requireAuth;
