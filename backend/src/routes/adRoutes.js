const express = require('express');
const router = express.Router();
const uploadAd = require('../middleware/uploadAdMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adController = require('../controllers/adController');

// Public route for home page
router.get('/active', adController.getActiveAds);

// Protected routes for Admin
router.get('/all', authMiddleware, adController.getAllAds);
router.post('/upload', authMiddleware, uploadAd.single('image'), adController.uploadAd);
router.put('/toggle/:id', authMiddleware, adController.toggleAdStatus);
router.delete('/:id', authMiddleware, adController.deleteAd);

module.exports = router;
