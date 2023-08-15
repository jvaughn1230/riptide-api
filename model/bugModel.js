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
      enum: ["Low", "Regular", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
