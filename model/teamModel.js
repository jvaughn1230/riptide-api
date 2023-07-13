const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  bugs: Array,
  members: Array,
  Projects: Array,
});
