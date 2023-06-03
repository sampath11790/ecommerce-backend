const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const DB = require("./Utli/database");
const UserRoute = require("./Route/User");
const CartRoute = require("./Route/Cart");
const AdminRoute = require("./Route/Admin");
//models
const User = require("./Model/User");
const Cart = require("./Model/Cart");
const Cartitem = require("./Model/cartItem");
const Product = require("./Model/Producet");

//middleware
app.use(bodyparser.json({ extended: false }));
// app.use("/", (req, res, next) => {
//   console.log("req", req.body);
//   next();
// });
app.use(cors());
app.use(UserRoute);
app.use(CartRoute);
app.use(AdminRoute);

app.use((req, res, next) => {
  res.status(404).json({ error: "page note found" });
});
//association
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: Cartitem });
Product.belongsToMany(Cart, { through: Cartitem });
DB.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected");
    });
  })
  .catch((err) => console.log(err));
