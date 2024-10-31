// routes/conversations.js

import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Enviar mensaje en una conversación con un participante
router.post('/:participantId', auth, async (req, res) => {
  try {
    const { participantId } = req.params;
    const { text } = req.body;

    // Buscar o crear la conversación con el participante
    const user = await User.findById(req.user.userId);
    let conversation = user.conversations.find(conv => conv.participantId.equals(participantId));

    // Crear nueva conversación si no existe
    if (!conversation) {
      conversation = { participantId, messages: [] };
      user.conversations.push(conversation);
    }

    // Agregar el mensaje a la conversación
    conversation.messages.push({ senderId: req.user.userId, text });
    await user.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar mensaje', error: error.message });
  }
});

// Obtener todas las conversaciones del usuario logueado
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('conversations.participantId', 'name avatar');
    res.json(user.conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener conversaciones', error: error.message });
  }
});

export default router;
