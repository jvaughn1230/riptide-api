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
router.get("/:id", (req, res) => {
  res.send(req.params.id);
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
router.patch("/:id", (req, res) => {});

//delete bug
router.delete("/:id", (req, res) => {});

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
