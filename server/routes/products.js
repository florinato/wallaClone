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
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  }
});

const upload = multer({ storage: storage });

// Ruta para crear un producto (agregar a la colección Product y referenciar en el usuario logueado)
router.post('/', auth, upload.array('images'), async (req, res) => {
  try {
    const { title, description, price, tags, condition, location } = req.body;

    // Mapear las rutas de las imágenes subidas
    const imagePaths = req.files.map(file => file.path);

    const newProduct = new Product({
      title,
      description,
      price,
      tags,
      condition,
      location,
      sellerId: req.user.userId,
      images: imagePaths, // Guardar las rutas de las imágenes
    });

    await newProduct.save();

    // Añadir la referencia del producto al usuario
    const user = await User.findById(req.user.userId);
    user.products.push(newProduct._id);
    await user.save();

    res.status(201).json(newProduct);  // Devolver el producto creado
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
});

// Obtener todos los productos disponibles (público)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ status: 'available' }).populate('sellerId', 'name location');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos disponibles', error: error.message });
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

    // Verificar que el producto pertenece al usuario logueado
    const product = await Product.findOne({ _id: productId, sellerId: req.user.userId });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado o acceso denegado' });
    }

    // Actualizar y guardar el producto
    Object.assign(product, updates);
    await product.save();

    res.json(product);  // Devolver el producto actualizado
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
});

// Eliminar un producto específico del usuario logueado
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    // Eliminar el producto de la colección Product
    const product = await Product.findOneAndDelete({ _id: productId, sellerId: req.user.userId });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado o acceso denegado' });
    }

    // Eliminar la referencia en el array de productos del usuario
    const user = await User.findById(req.user.userId);
    user.products = user.products.filter(id => !id.equals(productId));
    await user.save();

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

export default router;
