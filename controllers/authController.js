const User = require("../models/user");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60 * 24 * 3;

const createToken = (id) => {
  return jwt.sign({ id }, "my first token", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "That email is already registered ";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //   let errors = { email: "", password: "" };
  return errors;
};

const auth_signup_get = (req, res) => {
  res.render("auth/signup", { title: "Signup" });
};

const auth_login_get = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const auth_signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    console.log(token);
    res.cookie("jsonwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(201).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const auth_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("jsonwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(201).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const auth_logout_get = (req, res) => {
  res.cookie("jsonwt", " ", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  auth_signup_get,
  auth_login_get,
  auth_signup_post,
  auth_login_post,
  auth_logout_get,
};
