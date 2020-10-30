const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/blogs", blogController.blog_index);

router.get("/blogs/create", requireAuth, blogController.blog_create_get);

router.post("/blogs", blogController.blog_create_post);

router.get("/blogs/:id", requireAuth, blogController.blog_details);

router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;
