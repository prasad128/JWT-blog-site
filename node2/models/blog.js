const express = require("express");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    unique: true,
  },
  snippet: {
    type: String,
    required: [true, "Please enter a snippet"],
  },
  body: {
    type: String,
    required: [true, "Please enter a body"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
