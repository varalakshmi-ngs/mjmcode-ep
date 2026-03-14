// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const epaperRoutes = require("./routes/epaperRoutes");

// const app = express();

// /* CORS */
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// app.use(express.json());

// /* Static uploads folder */
// app.use(
//   "/epapers",
//   express.static(
//     "C:/Users/LENOVO/Desktop/epaper/backend/src/uploads/epapers"
//   )
// );

// /* Routes */
// app.use("/api/epapers", epaperRoutes);

// app.get("/", (req, res) => {
//   res.send("Epaper API Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const epaperRoutes = require("./routes/epaperRoutes");

const app = express();

/* Middleware */
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);

/* Static Folder */
app.use(
  "/epapers",
  express.static(path.join(__dirname, "uploads/epapers"))
);

/* Routes */
app.use("/api/epapers", epaperRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Epaper API Running 🚀");
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});