// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],  // Etiquetas en lugar de categoría
  condition: { type: String, enum: ['new', 'like-new', 'good', 'fair'], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  views: { type: Number, default: 0 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Referencia al usuario
});

productSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);

