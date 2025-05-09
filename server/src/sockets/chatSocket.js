const socketHandler = (socket, io) => {
    socket.on('send-message', (data) => {
      io.to(data.receiver).emit('receive-message', data);
    });
  
    socket.on('join', (userId) => {
      socket.join(userId);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  };
  
  export default socketHandler;
  