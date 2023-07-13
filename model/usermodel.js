const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  admin: Boolean,
  team: String,
  bugs: Array,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
