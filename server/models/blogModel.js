const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    subTitle: {
      required: true,
      type: String,
    },
    about: {
      required: true,
      type: String,
    },
    user_id: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
