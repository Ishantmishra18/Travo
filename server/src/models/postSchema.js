import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Post must have a description"],
    },
    cover:{
        type: String, // URLs to uploaded images (can store Cloudinary URLs etc.)
        required: true,
      }
    ,
    price: {
      type: Number,
      required: [true, "Price per night is required"],
    },
    location: {
      type:String
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relates to User model (foreign key)
      required: true,
    },
    amenities: [
      {
        type: String, // Example: 'WiFi', 'AC', 'Pool'
      }
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    bids: [
    {
      bidder: { type:String , require:true },
      amount: Number,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Post = mongoose.model("Post", postSchema);

export default Post;
