// routes/user.js

import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// 1. Ver perfil del usuario logueado
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
});

// 2. Editar perfil del usuario logueado
router.put('/me', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true,
      select: '-password'
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
});

// 3. Listar todos los usuarios (solo administrador)
router.get('/admin/users', auth, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.userId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar usuarios' });
  }
});

// 4. Invitar un nuevo usuario (solo administrador)
router.post('/admin/invite', auth, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.userId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    // Proceso de invitación: crea un usuario o envía un email de invitación (detallar implementación)
    res.json({ message: 'Invitación enviada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar la invitación' });
  }
});

// 5. Eliminar o suspender un usuario (solo administrador)
router.delete('/admin/users/:userId', auth, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.userId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

export default router;
