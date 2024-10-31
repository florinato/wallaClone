// routes/products.js

import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Crear un producto (añadir al usuario logueado)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, category, condition, location } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear nuevo producto y añadir al usuario
    const newProduct = { title, description, price, category, condition, location };
    user.products.push(newProduct);  // Añadir al array de productos del usuario
    await user.save();

    res.status(201).json(newProduct);  // Devolver el producto creado
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
});

// Obtener todos los productos del usuario logueado
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user.products);  // Devolver todos los productos del usuario
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Actualizar un producto específico del usuario logueado
router.put('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Obtiene el usuario desde el token

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const product = user.products.id(req.params.productId); // Busca el producto en el array de productos del usuario

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualiza los campos del producto específico
    Object.assign(product, req.body);
    await user.save();

    res.json(product); // Devuelve el producto actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
});

// Eliminar un producto específico del usuario logueado
router.delete('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const product = user.products.id(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Remover producto del array
    product.remove();  // Eliminar producto del array
    await user.save();

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

export default router;

