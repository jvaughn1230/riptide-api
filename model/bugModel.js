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
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    due: {
      type: Date,
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
