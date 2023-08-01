const express = require("express");
const router = express.Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_put);

module.exports = router;

// Auth Controller
// module.exports.signup_get = (req, res) => {}
// module.exports.signup_post = (req, res) => {}
// module.exports.login_get = (req, res) => {}
// module.exports.login_post = (req, res) => {}

// In auth Route
// const authController = require('../controllers/authController')

// router.get('signup, authController.signup_get')
// router.post('signup', authController.signup_post)
// router.get('login', authController.login_get)
// router.post('login', authController.login_put)

// in server.js
//app.use(authRoutes)

// router.post("/user", (req, res) => {
//   userSchema
//     .create(req.body)
//     .then((user) => {
//       if (!user) return res.statusMessage(400).send("there was an error");
//       res.send("Created User");
//     })
//     .catch((err) => res.status(400).send(err));
// });

// router
//   .put("/user", (req, res) => {
//     const { _id, userName, password, admin } = req.body;
//     userModel
//       .findByIdAndUpdate(_id)
//       .then((user) => {
//         if (!user) return res.status(400).send("user not found");
//         res.send("updated");
//       })
//       .catch((err) => {
//         if (err) res.status(400).send(err);
//       });
//   })
//   .post("/", (req, res) => {
//     userSchema
//       .findOne(req.body)
//       .then((user) => {
//         if (!user) return res.status(400).send("incorrect email/password");
//         res.cookie("user", user);
//         res.send(true);
//       })
//       .catch((err) => {
//         if (err) res.status(400).send(err);
//       });
//   })
//   .get("/", (req, res) => {
//     userSchema
//       .find()
//       .then((user) => {
//         if (!user) return res.status(400).send("no users");
//         res.send(user);
//       })
//       .catch((err) => {
//         if (err) res.status(400).send(err);
//       });
//   });
