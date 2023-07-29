const express = require("express");
const bugSchema = require("../model/bugModel");
const router = express.Router();

// TODO: fix priority accepting non enum values

//get all bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await bugSchema.find({});
    res.json(bugs);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get single bug
router.get("/:id", getBug, (req, res) => {
  res.send(res.bug);
});

//add bug
router.post("/", async (req, res) => {
  const bug = new bugSchema({
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

// Update Bug
router.patch("/:id", getBug, async (req, res) => {
  console.log("Bug: " + res.bug);
  const updates = req.body;
  console.log("updates" + updates);
  try {
    await bugSchema.updateOne(res.bug, updates);
    res.json("updated");
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
});

// Delete a bug
router.delete("/:id", getBug, async (req, res) => {
  try {
    await res.bug.deleteOne();
    res.json({ message: "bug deleted" });
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
});

// Middleware
async function getBug(req, res, next) {
  let bug;
  try {
    bug = await bugSchema.findById(req.params.id);
    if (bug == null) {
      return res.status(404).json({ message: "Cannot find bug" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.bug = bug;
  next();
}

// router.post("/addbug", (req, res) => {
//   bugSchema
//     .create(req.body)
//     .then((bug) => {
//       if (!bug) return res.statusMessage(400).send("there was an error");
//       res.send("Bug Created");
//     })
//     .catch((err) => res.status(400).send(err));
// });

module.exports = router;
