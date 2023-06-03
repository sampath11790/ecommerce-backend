const express = require("express");
const User = require("../controller/User");
const route = express.Router();

route.post("/user/login", User.login);
route.post("/user/signup", User.signup);

module.exports = route;
