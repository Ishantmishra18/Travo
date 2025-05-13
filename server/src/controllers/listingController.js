// controllers/listingController.js

import Post from '../models/postSchema.js';

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private
export const createListing = async (req, res) => {
  try {
const { title, description, location, price, images } = req.body;

const newPost = new Post({
  owner: req.user.id,
  title,
  description,
  location,
  price,
  images,
});

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create listing', error });
    console.log('the error', error)
  }
};



// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private
export const updateListing = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Listing not found' });
    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update listing', error });
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private
export const deleteListing = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Listing not found' });
    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });

    await post.remove();
    res.status(200).json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete listing', error });
  }
};

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getAllListings = async (req, res) => {
  try {
    const listings = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch listings', error });
  }
};

// @desc    Get a listing by ID
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Listing not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch listing', error });
  }
};

// @desc    Get listings by a specific user
// @route   GET /api/listings/user/:userId
// @access  Private
export const getUserListings = async (req, res) => {
  try {
    const listings = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user listings', error });
  }
};

// @desc    Upload image for a listing (optional placeholder)
// @route   POST /api/listings/:id/upload
// @access  Private
export const uploadListingImage = async (req, res) => {
  // You'd integrate multer/cloudinary/etc. here
  res.status(200).json({ message: 'Upload endpoint hit - implement later' });
};


export const placeBid = async (req, res) => {
  try {
    const { message, payment } = req.body;
    const { postID } = req.params;

    
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Push the bid into the bid array
    post.bids.push({
      message,
      amount: payment,
      bidder: req.user.id,
    });

    // Save the updated post
    await post.save();

    return res.status(200).json({ message: "Bid placed successfully", post });
  } catch (error) {
    console.error("Error placing bid:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
