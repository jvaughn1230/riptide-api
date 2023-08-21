const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  console.log("starting JWT verify");
  const authHeader = req.header["authorization"] || req.header["Authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("bearer confirmed");

  const token = authHeader.split(" ")[1];

  console.log("removed space");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded);
    console.log("starting to verify");
    if (err) return res.status(403).json({ message: "Forbidden" });
    console.log("passed error check");
    req.user = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
