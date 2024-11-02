// routes/images.js
import express from 'express';
import path from 'path';

const router = express.Router();

// Ruta para servir una imagen por nombre de archivo
router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);

  // Envía la imagen si existe, o responde con un 404 si no se encuentra
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Imagen no encontrada' });
    }
  });
});

export default router;

