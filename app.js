const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const UserRoute = require("./Route/User");
//middleware
app.use(bodyparser.json({ extended: false }));
app.use("/", (req, res, next) => {
  console.log("req", req.body);
});
app.use(cors());
app.use(UserRoute);

app.use((req, res, next) => {
  res.status(404).json({ error: "page note found" });
});
app.listen(process.env.PORT, () => {
  console.log("connected");
});
