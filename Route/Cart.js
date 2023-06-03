const express = require("express");
const route = express.Router();
const userValidation = require("../Middleware/midleware");
route.post("/cart", userValidation, (req, res, next) => {
  res.json(req.user);
});
route.get("/cart", userValidation, (req, res, next) => {
  res.json(req.user);
});

module.exports = route;
