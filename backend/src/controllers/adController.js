const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.uploadAd = (req, res) => {
  const { title, link_url } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Ad image is required' });
  }

  const image_path = req.file.filename;
  const link = link_url ? link_url : null;

  const sql = 'INSERT INTO ads (title, image_path, link_url) VALUES (?, ?, ?)';
  db.query(sql, [title, image_path, link], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error while saving ad.' });
    }
    res.status(201).json({ message: 'Ad uploaded successfully!' });
  });
};

exports.getAllAds = (req, res) => {
  const sql = 'SELECT * FROM ads ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching ads' });
    }
    res.json(results);
  });
};

exports.getActiveAds = (req, res) => {
  const sql = 'SELECT * FROM ads WHERE is_active = 1 ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching active ads' });
    }
    res.json(results);
  });
};

exports.toggleAdStatus = (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  const sql = 'UPDATE ads SET is_active = ? WHERE id = ?';
  db.query(sql, [is_active, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error toggling ad status' });
    }
    res.json({ message: 'Ad status updated' });
  });
};

exports.deleteAd = (req, res) => {
  const { id } = req.params;

  // First fetch ad to delete the file
  db.query('SELECT image_path FROM ads WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ message: 'Error finding ad to delete.' });
    }

    const imagePath = path.join(__dirname, '../uploads/ads', results[0].image_path);

    db.query('DELETE FROM ads WHERE id = ?', [id], (deleteErr) => {
      if (deleteErr) {
        return res.status(500).json({ message: 'Error deleting ad from database.' });
      }

      // Delete file if it exists
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      res.json({ message: 'Ad deleted successfully' });
    });
  });
};
