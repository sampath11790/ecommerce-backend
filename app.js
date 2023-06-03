const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const DB = require("./Utli/database");
const UserRoute = require("./Route/User");
//models
const User = require("./Model/User");
//middleware
app.use(bodyparser.json({ extended: false }));
// app.use("/", (req, res, next) => {
//   console.log("req", req.body);
//   next();
// });
app.use(cors());
app.use(UserRoute);

app.use((req, res, next) => {
  res.status(404).json({ error: "page note found" });
});
DB.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected");
    });
  })
  .catch((err) => console.log(err));
