// server/index.js
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import imageRoutes from './routes/images.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import { setupSocketHandlers } from './socket/handlers.js';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://192.168.1.131:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware de logging para registrar todas las solicitudes entrantes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Middleware de CORS y JSON
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api/images', imageRoutes);
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);



// Configuración de Socket.io
setupSocketHandlers(io);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://192.168.1.131:27017/wallapop-clone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Inicia el servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
