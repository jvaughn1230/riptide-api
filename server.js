require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

const bugRoutes = require("./routes/bugs");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://riptidebugtracker.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

let corsOptions = {
  origin: ["https://riptidebugtracker.onrender.com/"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/bugs", bugRoutes);
app.use("/projects", projectRoutes);

const db = mongoose.connection;
db.on("error", (error) => console.error("DB Error", error));
db.once("open", () => console.log("db connected"));

app.listen(process.env.port || 3500, () =>
  console.log(`Server is running on port ${process.env.PORT || 3500}`)
);
