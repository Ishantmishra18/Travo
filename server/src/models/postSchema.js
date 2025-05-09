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
    images: [
      {
        type: String, // URLs to uploaded images (can store Cloudinary URLs etc.)
        required: true,
      }
    ],
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
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
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Post = mongoose.model("Post", postSchema);

export default Post;
