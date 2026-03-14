const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadEpaper,
  getEpapers,
  deleteEpaper,
  updateEpaper,
  getEpaperById
} = require("../controllers/epaperController");

router.post("/upload", authMiddleware, upload.single("pdf"), uploadEpaper);

router.get("/all", getEpapers);

router.get("/:id",getEpaperById)

router.delete("/delete/:id", authMiddleware, deleteEpaper);
router.put("/update/:id", authMiddleware, updateEpaper)

module.exports = router;