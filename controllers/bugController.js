const bugSchema = require("../model/bugModel");

// GET
const getBugs = async (req, res) => {
  try {
    const bugs = await bugSchema.find({});
    res.status(200).json(bugs);
  } catch {
    res.status(500).json(err.message);
  }
};

const getBug = (req, res) => {
  res.status(200).json(res.bug);
};

// POST
const addBug = async (req, res) => {
  const bug = new bugSchema({
    issue: req.body.issue,
    details: req.body.details,
    user_id: req.user._id,
  });
  try {
    const newBug = await bug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH
const updateBug = async (req, res) => {
  const updates = req.body;
  try {
    await bugSchema.updateOne(res.bug, updates, { runValidators: true });
    res.json("updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteBug = async (req, res) => {
  try {
    await res.bug.deleteOne();
    res.json({ message: "bug deleted" });
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
};

module.exports = { getBugs, getBug, addBug, updateBug, deleteBug };
