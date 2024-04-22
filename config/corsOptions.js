const corsOptions = {
  origin: "https://riptidebugtracker.onrender.com",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ["Content-Type"],
};

module.exports = corsOptions;
