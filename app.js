const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

//middleware
app.use(bodyparser.json({ extended: false }));
app.use(cors());

app.use("/", (req, res, next) => {
  console.log("req", req.body);
});

app.listen(process.env.PORT, () => {
  console.log("connected");
});
