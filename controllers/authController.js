const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).json(user);
  } catch {
    res.status(400).json(err);
  }
};
