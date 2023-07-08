const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.port || 3000, () =>
  console.log(`Port is running on port ${process.env.port || 3000}`)
);
