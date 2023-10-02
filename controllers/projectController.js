const projectSchema = require("../model/projectModel");

const getProjects = async (req, res) => {
  const user_id = res.user._id;

  try {
    const projects = await projectSchema.find({ user_id });
    console.log(projects);
    res.status(200).json(projects);
  } catch {
    res.status(500).json(err.message);
  }
};

const addProject = async (req, res) => {
  console.log("Add Project Started");
  const project = new projectSchema({
    name: req.body.name,
    description: req.body.description,
    user_id: res.user._id,
  });
  console.log("Project Schema created");
  try {
    const newProject = await project.save();
    console.log("project added");
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await res.project.deleteOne();
    res.json({ message: "projected deleted" });
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
};

module.exports = { getProjects, addProject, deleteProject };
