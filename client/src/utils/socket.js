// utils/socket.jsx
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://travo-lg0h.onrender.com'; // https://travo-lg0h.onrender.com
                                                      //http://localhost:3000

// Initialize a socket connection once
const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket'], // ensures WebSocket over polling
});

export default socket;
