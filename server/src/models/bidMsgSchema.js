import mongoose from "mongoose";

const BidMessageSchema = new mongoose.Schema(
  {
    bidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
      required: true,
      index: true, // improves performance for bid-based queries
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    offerAmount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ["initial", "counter", "accept", "reject", "closedeal"],
      default: "initial",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const BidMessage = mongoose.model("BidMessage", BidMessageSchema);

export default BidMessage;
