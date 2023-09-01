const jwt = require("jsonwebtoken");

// TODO: Are we receiving the access Token or refresh Token here?

const verifyJWT = (req, res, next) => {
  const authHeader = req.header["authorization"] || req.header["Authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
