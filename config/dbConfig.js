const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
