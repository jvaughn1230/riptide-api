const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const createAccessToken = (id) => {
  console.log("creating new access token");
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (id) => {
  console.log("creating refresh token");
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.register(email, password, name);

    const token = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // res.cookie("jwt", token, { httpOnly: true });
    res.cookie("jwt", refreshToken, {
      // TODO: Reactivate httpOnly after testing on Postman
      httpOnly: true,
      // secure: true,   Turn on when hosted
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user, token, refreshToken });
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: true,   Turn on when hosted
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user, token, refreshToken });
  } catch (error) {
    res.status(400).json(error);
  }
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "token Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "forbidden" });

    // Finding User
    const user = User.findOne({ email: decoded.email }).exec();
    if (!user) return res.status(401).json({ message: "user unauthorized" });

    // Creating New Access Token
    const accessToken = createAccessToken(user._id);
    res.status(200).json(accessToken);
  });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie Cleared" });
};

module.exports = { registerUser, loginUser, refresh, logout };
