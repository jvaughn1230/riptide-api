const bugSchema = require("../model/bugModel");

async function fetchBug(req, res, next) {
  let bug;
  console.log("Fetch Bug Started");
  try {
    bug = await bugSchema.findById(req.params.id);
    console.log("Bug Found");
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
