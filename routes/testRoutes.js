const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload-foto-profesor', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No se recibió ninguna imagen' });
  }

  res.json({
    success: true,
    imageUrl: req.file.path, 
  });
});

module.exports = router;
