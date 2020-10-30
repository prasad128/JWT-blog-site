const Blog = require("../models/blog");

const handleErrors = (err) => {
  //   console.log(Object.values(err.errors));
  let errors = { title: "", snippet: "", body: "" };

  if (err.code === 11000) {
    errors.title = "that title is already there";
    return errors;
  }

  if (err.message.includes("Blog validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};

const blog_index = (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("blogs/blogsList", { title: "Home", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blog_create_post = async (req, res) => {
  const { title, snippet, body } = req.body;
  try {
    const blog = await Blog.create({ title, snippet, body });
    console.log(blog);
    res.status(201).json({ blog });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) =>
    res.render("blogs/details", { title: "Blog details", blog: result })
  );
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
};
