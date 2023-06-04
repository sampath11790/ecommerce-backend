const express = require("express");
const route = express.Router();
const Order = require("../controller/Orders");
const userValidation = require("../Middleware/midleware");
route.post("/order", userValidation, Order.postOrder);
route.get("/order", userValidation, Order.getOrder);
// route.delete("/cart", userValidation, Cart.deleteCart);

module.exports = route;
