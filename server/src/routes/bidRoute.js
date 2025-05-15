// routes/bidRoutes.js

import express from 'express';
import {
   placeBid, 
  respondToBid,
  getMyPlacedBids,
  getBidsOnMyPosts,
  getBidMessages,
} from '../controllers/bidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//add your bid in backend
router.post('/post/:postID' , protect, placeBid);

// Get bids placed by the logged-in user (Inbox A)
router.get('/placed', protect, getMyPlacedBids);

// Get bids made on the user's posts (Inbox B)
router.get('/received', protect, getBidsOnMyPosts);

// Get all messages (thread) for a specific bid
router.get('/:bidId/messages', protect, getBidMessages);

// Respond to a bid (counter, accept, reject, close)
router.post('/:bidId/respond', protect, respondToBid);

export default router;
