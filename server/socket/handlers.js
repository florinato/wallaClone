export const setupSocketHandlers = (io) => {
  const users = new Map();

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Autenticar usuario y unirlo a su sala personal
    socket.on('authenticate', (userId) => {
      users.set(socket.id, userId);
      socket.join(userId);
      console.log('Usuario autenticado:', userId);
    });

    // Manejar mensajes en tiempo real
    socket.on('sendMessage', async (data) => {
      const { conversationId, receiverId, message } = data;
      
      // Emitir al receptor
      io.to(receiverId).emit('newMessage', {
        conversationId,
        message
      });
    });

    // Manejar estado de escritura
    socket.on('typing', (data) => {
      const { conversationId, receiverId } = data;
      io.to(receiverId).emit('userTyping', {
        conversationId,
        userId: users.get(socket.id)
      });
    });

    socket.on('stopTyping', (data) => {
      const { conversationId, receiverId } = data;
      io.to(receiverId).emit('userStoppedTyping', {
        conversationId,
        userId: users.get(socket.id)
      });
    });

    // Limpiar al desconectar
    socket.on('disconnect', () => {
      const userId = users.get(socket.id);
      if (userId) {
        users.delete(socket.id);
        console.log('Usuario desconectado:', userId);
      }
    });
  });
};