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
      // httpOnly: true,
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
      // httpOnly: true,
      // secure: true,   Turn on when hosted
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user, token, refreshToken });
  } catch (error) {
    res.status(400).json(error);
  }
};

const refresh = async (req, res) => {
  console.log("refresh started");
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "token Unauthorized" });

  const refreshToken = cookies.refresh_token;
  console.log("NEw Refresh Token made");

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,

    async (req, res) => {
      // if (err) return res.status(403).json({ message: "forbidden" });

      const user = await User.findOne({ email: decoded.email }).exec();

      if (!user) return res.status(401).json({ message: "user unauthorized" });

      const accessToken = createAccessToken(user._id);
      console.log("New Access Token Created");
      res.json(accessToken);
    }
  );
};

module.exports = { registerUser, loginUser, refresh };
