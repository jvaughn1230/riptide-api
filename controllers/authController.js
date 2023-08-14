const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.register(email, password, name);

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true });

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { registerUser, loginUser };
