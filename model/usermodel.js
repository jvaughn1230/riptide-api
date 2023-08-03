const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  admin: Boolean,
  bugs: {
    type: mongoose.SchemaTypes.Object,
    ref: "Bug",
  },
});

// Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Credentials");
  }

  return user;
};

// Hash password
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
