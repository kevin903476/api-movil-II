const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Ruta de prueba para subir imagen
router.post('/upload-foto-profesor', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No se recibió ninguna imagen' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
});

module.exports = router;
