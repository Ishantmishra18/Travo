import { Server as SocketServer } from 'socket.io';
import BidMessage from '../models/bidMsgSchema.js';

export const initSocket = (server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected');

    socket.on('joinRoom', (bidId) => {
      socket.join(bidId);
      console.log(`Client joined room: ${bidId}`);
    });

    socket.on('sendMessage', async ({ bidId, message, sender }) => {
      try {
        const saved = await BidMessage.create({ bidId, sender, message });

        io.to(bidId).emit('receiveMessage', {
          _id: saved._id,
          message: saved.message,
          sender: saved.sender,
          timestamp: saved.createdAt,
        });
      } catch (err) {
        console.error('Error saving message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};
