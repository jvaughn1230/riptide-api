const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");

const checkUser = require("../middleware/checkUser");
const fetchProject = require("../middleware/projectMiddleware");

router.use(checkUser);

router.get("/", projectController.getProjects);

router.post("/", projectController.addProject);

router.delete("/", fetchProject, projectController.deleteProject);

module.exports = router;
