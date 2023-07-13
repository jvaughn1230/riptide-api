const mongoose = require("mongoose");

const bugModel = new mongoose.Schema({
  issue: String,
  details: String,
  notes: String,
  priority: Number,
  staus: Number,
  created: Date,
  lastUpdated: Date,
  assigned: String,
});
