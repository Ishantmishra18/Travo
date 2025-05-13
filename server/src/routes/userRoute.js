import express from 'express';
import {
  addBookmark,
  removeBookmark,
  getBookmarks
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/bookmark/:postID', protect, addBookmark);
router.delete('/bookmark/:postID', protect, removeBookmark);
router.get('/bookmark', protect, getBookmarks);

export default router;
