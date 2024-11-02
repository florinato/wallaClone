// routes/products.js
import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// Configuración de almacenamiento de multer para subir archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    // Crea un nombre de archivo único usando la fecha y el userId
    const uniqueName = `${Date.now()}-${req.user.userId}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Crear un producto
router.post('/', auth, upload.array('images'), async (req, res) => {
  try {
    const { title, description, price, tags, condition, location } = req.body;

    const imagePaths = req.files.map(file => file.filename); // Guardar solo el nombre de archivo

    const newProduct = new Product({
      title,
      description,
      price,
      tags,
      condition,
      location,
      sellerId: req.user.userId,
      images: imagePaths,
    });

    await newProduct.save();

    const user = await User.findById(req.user.userId);
    user.products.push(newProduct._id);
    await user.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
});

// Obtener todos los productos con búsqueda y filtros
router.get('/', async (req, res) => {
  try {
    const { search, minPrice, maxPrice, condition } = req.query;
    let query = { status: 'available' };

    // Búsqueda por texto en título y descripción
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtros de precio mínimo y máximo
    if (minPrice) query.price = { ...query.price, $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };

    // Filtrar por condición del producto
    if (condition) query.condition = condition;

    const products = await Product.find(query).populate('sellerId', 'name location');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos disponibles', error: error.message });
  }
});

// Obtener detalles de un producto específico
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'name location');
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
});

// Obtener todos los productos del usuario logueado
router.get('/my-products', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('products');
    res.json(user.products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Actualizar un producto específico del usuario logueado
router.put('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findOne({ _id: productId, sellerId: req.user.userId });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado o acceso denegado' });

    Object.assign(product, updates);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
});

// Eliminar un producto específico del usuario logueado
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOneAndDelete({ _id: productId, sellerId: req.user.userId });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado o acceso denegado' });

    const user = await User.findById(req.user.userId);
    user.products = user.products.filter(id => !id.equals(productId));
    await user.save();

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});
router.get('/tags', async (req, res) => {
  try {
    const searchTerm = req.query.search;
    if (!searchTerm) {
      return res.json([]);
    }

    const tags = await Product.distinct("tags", { 
      tags: { $regex: searchTerm, $options: "i" } 
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener sugerencias', error: error.message });
  }
});
export default router;
