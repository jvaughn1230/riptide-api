const bugSchema = require("../model/bugModel");

async function fetchBug(req, res, next) {
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

module.exports = fetchBug;
