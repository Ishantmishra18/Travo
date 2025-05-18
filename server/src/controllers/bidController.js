import Bid from '../models/bidSchema.js';
import BidMessage from '../models/bidMsgSchema.js';
import Listing from '../models/postSchema.js';
import Notification from '../models/notifySchema.js';
import asyncHandler from 'express-async-handler';


//bid/:PostID
export const placeBid = asyncHandler(async (req, res) => {
  const { offerAmount, message } = req.body;
  const post = await Listing.findById(req.params.postID);

  if (!post) throw new Error('Listing not found');

  // Prevent bidding on your own post
  if (post.owner.toString() === req.user.id.toString()) {
    res.status(400);
    throw new Error("You can't bid on your own post");
  }

   const existingBid = await Bid.findOne({
    postId: post._id,
    bidder: req.user.id,
  });

  if (existingBid) {
    return res.status(200).json({
      message: 'You have already placed a bid on this post',
      bidId: existingBid._id,
    });
  }
  
  // Create new bid
  const bid = await Bid.create({
    postId: post._id,
    postOwner: post.owner,
    bidder: req.user.id,
    latestMessage: message,
    latestOfferAmount: offerAmount,
    latestMessageAt: new Date(),
  });

  // Create first message for this bid
  await BidMessage.create({
    bidId: bid._id,
    sender: req.user.id,
    message,
    offerAmount,
    type: 'initial',
  });

  // Send notification to post owner
  await Notification.create({
    user: post.owner,
    fromUser: req.user.id,
    post: post._id,
    bidId: bid._id,
    type: 'bid',
    message: `New bid: ₹${offerAmount}`,
  });

  res.status(201).json({ bidId: bid._id });
});



// @desc Respond to a bid (counter, accept, reject, closedeal)
// @route POST /api/bid/:bidId/respond
export const respondToBid = asyncHandler(async (req, res) => {
  const { message, offerAmount, type } = req.body;
  const bid = await Bid.findById(req.params.bidId);

  if (!bid) throw new Error('Bid not found');
  if (bid.status !== 'open') {
    res.status(400);
    throw new Error('Negotiation is already closed');
  }

  const isPostOwner = req.user._id.toString() === bid.postOwner.toString();
  const isBidder = req.user._id.toString() === bid.bidder.toString();

  if (!isPostOwner && !isBidder) {
    res.status(403);
    throw new Error('You are not authorized to respond to this bid');
  }

  if (['accept', 'closedeal'].includes(type)) {
    bid.status = type === 'accept' ? 'accepted' : 'closed';
    await bid.save();
  }

  await BidMessage.create({
    bidId: bid._id,
    sender: req.user._id,
    message,
    offerAmount,
    type,
  });

  const recipient = isPostOwner ? bid.bidder : bid.postOwner;

  await Notification.create({
    user: recipient,
    fromUser: req.user._id,
    post: bid.postId,
    bidId: bid._id,
    type,
    message: `${type === 'counter' ? 'Counter offer' : type}: ₹${offerAmount || ''}`,
  });

  res.status(200).json({ success: true });
});



// @desc Get bids I placed (Inbox A)
// @route GET /api/bid/placed
export const getMyPlacedBids = asyncHandler(async (req, res) => {
  const myBids = await Bid.find({
    $or: [
      { bidder: req.user.id },
      { postOwner: req.user.id }
    ]
  })
  .populate('postOwner', 'username cover')
  .populate('postId')
  .populate('bidder', 'username cover')
  .lean();

  res.status(200).json(myBids);
});


//sendMessage
export const sendMessage = asyncHandler(async (req , res)=>{
  const {message}=req.body;

  const newMessage = await BidMessage.create({
    bidId: req.params.bidId,
    sender: req.user.id,
    message,
  });
  res.status(201).json({ message: 'Message sent successfully', data: newMessage });
})



// @desc Get full thread of bid messages
// @route GET /api/bid/:bidId/messages
export const getBidMessages = asyncHandler(async (req, res) => {
  const messages = await BidMessage.find({ bidId: req.params.bidId }).sort({ createdAt: 1 });
 const bid = await Bid.findById(req.params.bidId)
    .populate({
      path: 'postId',
      select: 'title price cover'  // select only needed fields
    })
  .populate({
      path: 'bidder',
      select: 'username cover'
    })
    .populate({
      path: 'postOwner',
      select: 'username cover'
    });

  if (!bid) {
    res.status(404);
    throw new Error('Bid not found');
  }

  // Determine the chat partner (the "other user")
  let chatPartner = null;
  if (bid.bidder._id.toString() === req.user.id.toString()) {
    chatPartner = bid.postOwner;
  } else {
    chatPartner = bid.bidder;
  }

  res.json({messages , bid , chatPartner});
});
