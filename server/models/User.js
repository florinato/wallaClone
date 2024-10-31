// models/User.js
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Subdocumento para productos embebidos
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  condition: { type: String, enum: ['new', 'like-new', 'good', 'fair'], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  views: { type: Number, default: 0 }
}, { _id: false });  // `_id: false` evita un nuevo `_id` para cada producto

// Subdocumento para mensajes en una conversación
const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

// Subdocumento para conversaciones embebidas
const conversationSchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messageSchema]
}, { _id: false });

// Esquema principal del usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  products: [productSchema],  // Array de productos embebidos
  conversations: [conversationSchema],  // Array de conversaciones embebidas
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Hook pre-save para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  // Solo encripta si la contraseña ha sido modificada o es nueva
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error); // Asegura que el error se pasa correctamente en caso de fallo
  }
});

// Método para comparar contraseñas durante el login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
