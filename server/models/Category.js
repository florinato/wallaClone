// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  icon: {
    type: String,
    default: '' // Podrías usar una URL o un nombre de icono si utilizas una librería de iconos
  }
});

export default mongoose.model('Category', categorySchema);
