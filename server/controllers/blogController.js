const BLOG = require("../models/blogModel");
const mongoose = require("mongoose");

// GET req (all blog)
const blogs = async (req, res) => {
  const user_id = req.user._id;
  const arrCollection = await BLOG.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(arrCollection);
};

// GET req (a blog)
const blog = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid params ID" });
  }
  const document = await BLOG.findById(id);
  if (!document) {
    return res.status(404).json({ error: "Searching document not found" });
  }
  res.status(200).json(document);
};

// POST req (create a blog)
const createBlog = async (req, res) => {
  const data = req.body;
  const { title, subTitle, about } = req.body;
  const storedPostData = [];
  if (!data.title) {
    storedPostData.push("title");
  }
  if (!data.subTitle) {
    storedPostData.push("subTitle");
  }
  if (!data.about) {
    storedPostData.push("about");
  }
  if (storedPostData.length > 0) {
    return res.status(404).json({ error: "Fill all data", storedPostData });
  }

  try {
    const user_id = req.user._id;
    const document = await BLOG.create({ title, subTitle, about, user_id });
    res.status(200).json(document);
  } catch (error) {
    res.status(404).json({ error: "Error in creating blog" });
  }
};

// DELETE req (delete a blog)
const deleteBlog = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid params ID" });
  }
  const document = await BLOG.findOneAndDelete({ _id: id });
  if (!document) {
    return res.status(404).json({ error: "Searching document not found" });
  }
  res.status(200).json(document);
};

// UPDATE OF PATCH req (update a blog)
const updateBlog = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid params ID" });
  }
  const document = await BLOG.findOneAndUpdate({ _id: id }, { ...data });
  if (!document) {
    return res.status(404).json({ error: "Searching document not found" });
  }
  res.status(200).json(document);
};

module.exports = {
  blogs,
  blog,
  createBlog,
  deleteBlog,
  updateBlog,
};
