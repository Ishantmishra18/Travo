import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoute.js';
import userRoute from './routes/userRoute.js';
import bidRoute from './routes/bidRoute.js';
import cors from 'cors';
import http from 'http';
import { initSocket } from './sockets/index.js'; 

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Setup HTTP server for Socket.io
const server = http.createServer(app);
const io = initSocket(server); // Initialize Socket.io and get instance

// Attach io to only /api/bid routes
app.use('/api/bid', (req, res, next) => {
  req.io = io;
  next();
}, bidRoute);

// Other routes (without io)
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/user', userRoute);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
