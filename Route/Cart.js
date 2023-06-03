const express = require("express");
const route = express.Router();
const Cart = require("../controller/Cart");
const userValidation = require("../Middleware/midleware");
route.post("/cart", userValidation, Cart.postCart);
route.get("/cart", userValidation, Cart.getCart);
route.delete("/cart", userValidation, Cart.deleteCart);

module.exports = route;
