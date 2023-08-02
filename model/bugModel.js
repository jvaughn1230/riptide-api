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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
