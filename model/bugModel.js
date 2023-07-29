const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    notes: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    staus: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
    created: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bugs", bugSchema);
