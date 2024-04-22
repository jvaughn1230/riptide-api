require("dotenv").config();

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const bugRoutes = require("./routes/bugs");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

const connectDB = require("./config/dbConfig");

const app = express();

// Cors
app.use(cors(corsOptions));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/bugs", bugRoutes);
app.use("/projects", projectRoutes);

// DB
connectDB();

app.listen(process.env.port || 3500, () =>
  console.log(`Server is running on port ${process.env.PORT || 3500}`)
);
