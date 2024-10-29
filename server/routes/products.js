import express from 'express';
import multer from 'multer';
import path from 'path';
import { auth } from '../middleware/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
  }
});

// Crear producto
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, category, condition, location } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const product = new Product({
      title,
      description,
      price: Number(price),
      images,
      category,
      condition,
      location,
      seller: req.user.userId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

// Obtener productos con filtros y paginación
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      condition,
      location,
      page = 1, 
      limit = 20 
    } = req.query;

    const query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (condition) {
      query.condition = condition;
    }
    if (location) {
      query.location = new RegExp(location, 'i');
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('seller', 'name avatar rating')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name avatar rating location')
      .populate('favorites', 'id');

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Incrementar vistas
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

// Actualizar producto
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id,
      seller: req.user.userId 
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const updates = req.body;
    if (req.files?.length) {
      updates.images = [...product.images, ...req.files.map(file => `/uploads/${file.filename}`)];
    }

    Object.assign(product, updates);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

// Eliminar producto
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ 
      _id: req.params.id,
      seller: req.user.userId 
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

// Marcar/desmarcar favorito
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const isFavorite = product.favorites.includes(req.user.userId);
    if (isFavorite) {
      product.favorites = product.favorites.filter(id => id.toString() !== req.user.userId);
    } else {
      product.favorites.push(req.user.userId);
    }

    await product.save();
    res.json({ isFavorite: !isFavorite });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar favoritos' });
  }
});

export default router;