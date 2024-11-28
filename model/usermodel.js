const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

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

// Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect Credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect Credentials");
  }

  return user;
};

// Static Signup Method
userSchema.statics.register = async function (email, password, name) {
  if (!email || !password) {
    throw new Error("All Fields Required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password not strong enough. Password needs to inlude both lower and upper case letters, at leaset one number, and at least  one symbol"
    );
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, name, password: hashedPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);
