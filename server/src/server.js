
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from  './routes/listingRoute.js'
import userRoute from './routes/userRoute.js'
import bidRoute from './routes/bidRoute.js'
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listing' , listingRoutes);
app.use('/api/user' , userRoute);
app.use('/api/bid' ,bidRoute)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
