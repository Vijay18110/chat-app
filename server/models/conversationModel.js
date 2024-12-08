const mongoose = require("mongoose");
const { messageModel } = require("./messageModel");
const conversationSchema = new mongoose.Schema(
  {
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: messageModel,
        required: true,
        default: [],
      },
    ],
  },
  { timestamps: true }
);
exports.conversation = mongoose.model("conversation", conversationSchema);
