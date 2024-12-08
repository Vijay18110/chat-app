const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    reviecerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

exports.messageModel = mongoose.model("messages", messageSchema);
