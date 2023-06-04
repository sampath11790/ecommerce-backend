const bcrypt = require("bcrypt");
const User = require("../Model/User");
const JWT = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  //   res.json(req.body);
  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (!err) {
      const obj = {
        email: req.body.email,
        password: hash,
      };

      User.create(obj)
        .then(res.status(200).json({ message: "signup successful" }))
        .catch((err) => res.status(401).json({ error: "Enter valid data" }));
    } else {
      // console.log(err);
      res.status(401).json({ error: "Enter valid data", message: err });
    }
  });
};
//   console.log("req");
//   res.json(req.body);

exports.login = async (req, res, next) => {
  try {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.findAll({ where: { email: req.body.email } });

    if (user.length > 0) {
      const isMatch = await bcrypt.compare(obj.password, user[0].password);

      if (isMatch) {
        res.status(200).json({
          message: "login success",
          Token: getToken(user[0].id),
        });
      } else {
        res.status(400).json({ error: "Enter valid data" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: "Enter valid data" });
  }
};

function getToken(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY);
}
