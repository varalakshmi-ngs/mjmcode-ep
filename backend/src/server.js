require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const epaperRoutes = require("./routes/epaperRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adRoutes = require("./routes/adRoutes");

const app = express();

/* Middleware */
app.use(express.json());

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://epaper.pratyakshanews.com"
    ],
    credentials: true
  })
);

/* Static Folder for PDFs */
app.use(
  "/epapers",
  express.static(path.join(__dirname, "uploads/epapers"))
);

/* Static Folder for Ads */
app.use(
  "/ads",
  express.static(path.join(__dirname, "uploads/ads"))
);

/* API Routes */
app.use("/api/epapers", epaperRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ads", adRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Epaper API Running 🚀");
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});