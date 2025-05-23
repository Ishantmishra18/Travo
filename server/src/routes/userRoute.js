import express from 'express';
import upload from '../middleware/upload.js';
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
  editUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/bookmark/:postID', protect, addBookmark);
router.delete('/bookmark/:postID', protect, removeBookmark);
router.get('/bookmark', protect, getBookmarks);
router.post('/edit' , protect , upload.single('image'), editUser);

export default router;
