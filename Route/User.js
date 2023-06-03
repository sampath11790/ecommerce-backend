const express = require("express");
const User = require("../controller/User");

const route = express.Router();
route.post("/user/signup", User.signup);
route.post("/user/login", User.login);

module.exports = route;
