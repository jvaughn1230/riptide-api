const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookie.jwt.sign(user, JWT_SECRET, { expiresIn: "15m" });

  // Working Here

  //End

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.local.user = null;
      } else {
        let user = await User.findById(decodedToken._id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("please login");
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
