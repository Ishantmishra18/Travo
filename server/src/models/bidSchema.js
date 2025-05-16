import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    postOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "accepted", "rejected", "counterOffer", "closed"],
      default: "open",
    },

    // Latest info for quick access
    latestMessage: {
      type: String,
      default: "",
    },
    latestOfferAmount: {
      type: Number,
      default: 0,
    },
    latestMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;
