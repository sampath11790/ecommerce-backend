const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const userValidation = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const response = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const Userdata = await User.findByPk(response.userId);
    if (Userdata) {
      req.user = Userdata;
      next();
    }
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      error: "yor are not authorized to acceess this page",
      message: err,
    });
  }
};
module.exports = userValidation;
