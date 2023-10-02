const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required: true,
    },
    recreate: {
      type: String,
      required: true,
    },
    updates: {
      type: String,
      default: "",
    },
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
    due: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    // type: String, required: true
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // project: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    //   default: "",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
