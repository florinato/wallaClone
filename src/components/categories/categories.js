// routes/categories.js
import express from 'express';
import Category from '../models/Category.js'; // Suponiendo que tienes un modelo Category

const router = express.Router();

// Obtener categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

export default router;
