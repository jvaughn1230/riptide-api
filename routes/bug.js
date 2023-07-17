const express = require("express");
const bugModel = require("../model/bugmodel");
const router = express.Router();

router.post("/addbug", (req, res) => {
  bugModel
    .create(req.body)
    .then((bug) => {
      if (!bug) return res.statusMessage(400).send("there was an error");
      res.send("Bug Created");
    })
    .catch((err) => res.status(400).send(err));
});
