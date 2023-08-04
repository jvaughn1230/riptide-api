require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

const bugRoutes = require("./routes/bugs");
const authRoutes = require("./routes/auth");

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("db connected"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/bugs", bugRoutes);

app.listen(process.env.port || 3500, () =>
  console.log(`Port is running on port ${process.env.PORT || 3500}`)
);
