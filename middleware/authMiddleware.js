const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jsonwt;
  if (token) {
    jwt.verify(token, "my first token", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/auth/login");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.redirect("/auth/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jsonwt;
  if (token) {
    jwt.verify(token, "my first token", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        console.log("Check dt", decodedToken.id);

        let userL = await User.findById(decodedToken.id);
        console.log("UserL", userL);
        console.log("UserL", userL);
        res.locals.user = userL;
        next();
      }
    });
  } else {
    console.log("Token-", token);
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
