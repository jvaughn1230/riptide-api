require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.TEMP_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("db connected"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", require("./routes/auth"));
app.use("/bugs", require("./routes/bugs"));

app.listen(process.env.port || 3500, () =>
  console.log(`Port is running on port ${process.env.port || 3500}`)
);

// Endpoints

//signIn -> POST
//Register -> POST
//profile/:userId -> GET
//addBug -> PUT
//ViewBug -> GET

// ssl:        true,
