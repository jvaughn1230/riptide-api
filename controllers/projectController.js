const projectSchema = require("../model/projectModel");

const getProjects = async (req, res) => {
  const user_id = res.user._id;

  try {
    const projects = await projectSchema.find({ user_id });
    res.status(200).json(projects);
  } catch {
    res.status(500).json(err.message);
  }
};

const addProject = async (req, res) => {
  const project = new projectSchema({
    name: req.body.name,
    description: req.body.description,
    user_id: res.user._id,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  let updates = req.body;

  try {
    await projectsSchema.updateOne(res.project, updates);
    res.json("updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
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

module.exports = { getProjects, addProject, deleteProject, updateProject };
