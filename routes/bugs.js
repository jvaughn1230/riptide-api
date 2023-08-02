const express = require("express");
const router = express.Router();

const fetchBug = require("../middleware/bugMiddleware");
const bugController = require("../controllers/bugController");

router.get("/", bugController.getBugs);

router.get("/:id", fetchBug, bugController.getBug);

router.post("/", bugController.addBug);

router.patch("/:id", fetchBug, bugController.updateBug);

router.delete("/:id", fetchBug, bugController.deleteBug);

module.exports = router;
