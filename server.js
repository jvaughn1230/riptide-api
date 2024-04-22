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

// // DB
// mongoose.connect(process.env.MONGO_URI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://riptidebugtracker.onrender.com"
//     // "http://localhost:3000"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

// let corsOptions = {
//   // TODO: change back before commits
//   // origin: ["https://riptidebugtracker.onrender.com/"],
//   origin: ["http://localhost:3000"],
// };

// Cors
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/bugs", bugRoutes);
app.use("/projects", projectRoutes);

connectDB();

app.listen(process.env.port || 3500, () =>
  console.log(`Server is running on port ${process.env.PORT || 3500}`)
);
