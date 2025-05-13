// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';


const jwtsec='slkfjdslkfjslkdfjs'

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // or from headers
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, jwtsec);
    req.user = { id: decoded.id }; // Keep it minimal

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
