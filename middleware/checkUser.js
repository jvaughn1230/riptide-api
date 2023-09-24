const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.local.user = null;
        } else {
          let user = await User.findById(decodedToken.id);
          res.user = user;
          next();
        }
      }
    );
  } else {
    console.log("please login");
  }
};

module.exports = checkUser;
