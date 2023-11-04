const bugSchema = require("../model/bugModel");

// GET
const getBugs = async (req, res) => {
  const user_id = res.user._id;
  try {
    const bugs = await bugSchema
      .find({ user_id, status: { $ne: 3 } })
      .populate("project", "name");
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
    recreate: req.body.recreate,
    priority: req.body.priority,
    project: req.body.project,
    due: req.body.due,
    user_id: res.user._id,
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
  let updates = req.body;
  console.log(updates);

  if (updates.status === "3") {
    updates.completedAt = new Date();
    try {
      await bugSchema.updateOne(res.bug, updates);
      res.status(200).json("updated");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      await bugSchema.updateOne(res.bug, updates); //{ runValidators: true }
      res.json("updated");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
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
