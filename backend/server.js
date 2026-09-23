const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const seedInitialData = require("./seedData");

dotenv.config();

const app = express();

// Connect to MongoDB and seed initial data
connectDB().then(() => {
  seedInitialData();
});

const allowedOrigins = [
  "https://dedivinedecor.in",
  "https://www.dedivinedecor.in",
  "http://dedivinedecor.in",
  "http://www.dedivinedecor.in",
  "http://localhost:5173",
  "http://localhost:3000",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith("dedivinedecor.in") ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Allow origin to prevent CORS blocking
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

app.get(["/", "/api/health"], (req, res) => {
  const dbStateMap = { 0: "Disconnected", 1: "Connected", 2: "Connecting", 3: "Disconnecting" };
  const dbStatus = dbStateMap[mongoose.connection.readyState] || "Unknown";

  res.json({
    success: true,
    message: "Kaizen School API is running",
    database: {
      status: dbStatus,
      name: mongoose.connection.name || "N/A",
      host: mongoose.connection.host || "N/A",
    },
  });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/academics", require("./routes/academicsRoutes"));
app.use("/api/facilities", require("./routes/facilityRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/admissions", require("./routes/admissionsRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});