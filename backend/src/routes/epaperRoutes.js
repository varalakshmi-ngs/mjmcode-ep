const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadEpaper,
  getEpapers,
  deleteEpaper,
  updateEpaper,
  getEpaperById
} = require("../controllers/epaperController");

router.post("/upload", upload.single("pdf"), uploadEpaper);

router.get("/all", getEpapers);

router.get("/:id",getEpaperById)

router.delete("/delete/:id", deleteEpaper);
router.put("/update/:id", updateEpaper)

module.exports = router;