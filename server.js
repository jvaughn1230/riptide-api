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

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // TODO: Change back after testing on Postman
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); //Change to front url when hosted & localhost3000 when testing frontend
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/bugs", bugRoutes);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("db connected"));

app.listen(process.env.port || 3500, () =>
  console.log(`Server is running on port ${process.env.PORT || 3500}`)
);
