const express = require("express");
const bugModel = require("../model/bugmodel");
const router = express.Router();

//get all bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await bugModel.find({});
    res.json(bugs);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get single bug
router.get("/:id", getBug, (req, res) => {
  res.json(res.bug);
});

//add bug
router.post("/", async (req, res) => {
  const bug = new bugModel({
    issue: req.body.issue,
    details: req.body.details,
  });
  try {
    const newBug = await bug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update bug
router.patch("/:id", getBug, async (req, res) => {
  if (req.body.details != null) {
    res.bug.details = req.bug.details;
  }
  try {
    const updatedBug = await res.bug.save();
    res.json(updatedBug);
  } catch {
    res.status(400).json(err.message);
  }
});

router.delete("/:id", getBug, async (req, res) => {
  try {
    res.bug.remove();
    res.json({ message: "bug deleted" });
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
});

async function getBug(req, res, next) {
  let bug;
  try {
    bug = await bugModel.findById(req.params.id);
    if (bug == null) {
      return res.status(404).json({ message: "Cannot find bug" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.bug = bug;
  next();
}

router.post("/addbug", (req, res) => {
  bugModel
    .create(req.body)
    .then((bug) => {
      if (!bug) return res.statusMessage(400).send("there was an error");
      res.send("Bug Created");
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
