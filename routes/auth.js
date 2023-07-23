const express = require("express");
const userModel = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/user", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => {
      if (!user) return res.statusMessage(400).send("there was an error");
      res.send("Created User");
    })
    .catch((err) => res.status(400).send(err));
});

router
  .put("/user", (req, res) => {
    const { _id, userName, password, admin } = req.body;
    userModel
      .findByIdAndUpdate(_id)
      .then((user) => {
        if (!user) return res.status(400).send("user not found");
        res.send("updated");
      })
      .catch((err) => {
        if (err) res.status(400).send(err);
      });
  })
  .post("/", (req, res) => {
    userModel
      .findOne(req.body)
      .then((user) => {
        if (!user) return res.status(400).send("incorrect email/password");
        res.cookie("user", user);
        res.send(true);
      })
      .catch((err) => {
        if (err) res.status(400).send(err);
      });
  })
  .get("/", (req, res) => {
    userModel
      .find()
      .then((user) => {
        if (!user) return res.status(400).send("no users");
        res.send(user);
      })
      .catch((err) => {
        if (err) res.status(400).send(err);
      });
  });

module.exports = router;
