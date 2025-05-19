// utils/socket.jsx
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // ✅ make sure this matches your server's base URL

// Initialize a socket connection once
const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket'], // ensures WebSocket over polling
});

export default socket;
