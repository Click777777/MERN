const express = require("express");
const router = express.Router();
const {
  blogs,
  blog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");
const requireAuth = require("../middleware/requireAuth");

// check Auth
router.use(requireAuth);

// GET req (all blog)
router.get("/", blogs);

// GET req (a blog)
router.get("/:id", blog);

// POST req (create a blog)
router.post("/", createBlog);

// DELETE req (delete a blog)
router.delete("/:id", deleteBlog);

// UPDATE OF PATCH req (update a blog)
router.patch("/:id", updateBlog);

module.exports = router;
