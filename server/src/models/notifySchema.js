import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {  // Recipient of the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromUser: {  // Optional sender (who triggered the action)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {  // Optional: the post related to the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  bidId: {  // Optional: specific bid/negotiation this relates to
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
  },
  type: {
    type: String,
    enum: ["bid", "accept", "reject", "counter", "closedeal", "message", "booking"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
