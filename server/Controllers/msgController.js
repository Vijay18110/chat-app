const { conModel, conversation } = require("../models/conversationModel");
const { messageModel } = require("../models/messageModel");
// const { user } = require("../models/UserModel");
exports.saveMsg = async (req, res) => {
  try {
    let reviecerId = req.params.id;
    let senderId = req.validUser._id;
    let message = req.body.msg;
    let isconversation = await conversation.findOne({
      members: { $all: [reviecerId, senderId] },
    });
    if (!isconversation) {
      isconversation = await conversation.create({
        members: [reviecerId, senderId],
      });
    }
    let newMsg = new messageModel({
      reviecerId,
      senderId,
      message,
    });
    if (newMsg) {
      isconversation.messages.push(newMsg._id);
    }
    await Promise.all([isconversation.save(), newMsg.save()]);
    res.json({ message: "msg save successfully" }).status(true);
  } catch (error) {
    console.log("something went wrong", error);
    res.json({ msg: "something went wrong", error });
  }
};
