// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // recipient
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional sender
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // optional
  type: {
    type: String,
    enum: ["bid", "accept", "reject", "counter", "message", "booking"],
    required: true,
  },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
