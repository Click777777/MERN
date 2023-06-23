const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.statics.singup = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }

  const isEmail = await this.findOne({ email });
  if (isEmail) {
    throw Error("Email already in exit");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const document = await this.create({ email, password: hashPassword });
  return document;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const isEmail = await this.findOne({ email });
  if (!isEmail) {
    throw Error("Email doesn't exit");
  }

  const isPassword = await bcrypt.compare(password, isEmail.password);
  if (!isPassword) {
    throw Error("Wrong Password");
  }

  return isEmail;
};

module.exports = mongoose.model("user", userSchema);
