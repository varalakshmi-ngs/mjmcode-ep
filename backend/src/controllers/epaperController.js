const db = require("../config/db");

exports.uploadEpaper = (req, res) => {
  const { title, edition, publish_date } = req.body;
  const pdf = req.file.filename;

  const sql =
    "INSERT INTO epapers (title, edition, publish_date, pdf_path) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, edition, publish_date, pdf], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Epaper uploaded successfully",
    });
  });
};

exports.getEpapers = (req, res) => {
  const sql = "SELECT * FROM epapers ORDER BY publish_date DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.deleteEpaper = (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM epapers WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Epaper deleted successfully"
    });

  });

};

exports.updateEpaper = (req, res) => {

  const id = req.params.id;

  const { title, edition, publish_date } = req.body;

  const sql = `
  UPDATE epapers
  SET title=?, edition=?, publish_date=?
  WHERE id=?
  `;

  db.query(sql, [title, edition, publish_date, id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Epaper updated successfully"
    });

  });

};

exports.getEpaperById = (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM epapers WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Epaper not found" });
    }

    res.json(result[0]);

  });

};