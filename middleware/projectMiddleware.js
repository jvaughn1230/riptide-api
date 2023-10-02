const projectSchema = require("../model/projectModel");

async function fetchProject(req, res, next) {
  let project;

  try {
    project = await projectSchema.findById(req.params.project); //.find({completed: false})
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.project = project;
  next();
}

module.exports = fetchProject;
