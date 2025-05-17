// routes/bidRoutes.js

import express from 'express';
import {
   placeBid, 
  getMyPlacedBids,
  getBidMessages,
} from '../controllers/bidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//add your bid in backend
router.post('/post/:postID' , protect, placeBid);

// Get bids placed by the logged-in user (Inbox A)
router.get('/placed', protect, getMyPlacedBids);

//get the messages of the bid
router.get('/:bidId/messages', protect , getBidMessages)

// Get this accept the bid 
router.post('/:bidId/accept',protect , )

//get this reject bid
router.post('/:bidId/reject',protect , )

//get this counteroffer
router.post('/:bidId/counterOffer',protect , )

//close the bid
router.post('/:bidId/close',protect , )



export default router;
