import express from 'express';
import { auth } from '../middleware/auth.js';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();

// Obtener conversaciones del usuario
router.get('/conversations', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.userId
    })
    .populate('participants', 'name avatar')
    .populate('product', 'title images')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener conversaciones' });
  }
});

// Obtener mensajes de una conversación
router.get('/conversations/:conversationId', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: req.user.userId
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversación no encontrada' });
    }

    const messages = await Message.find({
      conversation: req.params.conversationId
    })
    .populate('sender', 'name avatar')
    .sort({ createdAt: 1 });

    // Marcar mensajes como leídos
    await Message.updateMany(
      {
        conversation: req.params.conversationId,
        sender: { $ne: req.user.userId },
        read: false
      },
      { read: true }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes' });
  }
});

// Iniciar o continuar conversación
router.post('/conversations', auth, async (req, res) => {
  try {
    const { productId, receiverId, message } = req.body;

    let conversation = await Conversation.findOne({
      product: productId,
      participants: { $all: [req.user.userId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [req.user.userId, receiverId],
        product: productId
      });
      await conversation.save();
    }

    const newMessage = new Message({
      conversation: conversation._id,
      sender: req.user.userId,
      content: message
    });

    await newMessage.save();

    conversation.lastMessage = newMessage._id;
    await conversation.save();

    // Emitir evento de socket
    req.app.get('io').to(receiverId).emit('newMessage', {
      conversationId: conversation._id,
      message: newMessage
    });

    res.status(201).json({
      conversation,
      message: newMessage
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
});

export default router;