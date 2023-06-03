const express = require("express");
const route = express.Router();
const Admincontrol = require("../controller/Admin");

route.post("/Admin/porduct", Admincontrol.postProduct);

route.get("/Admin/porduct", Admincontrol.getProduct);

module.exports = route;
