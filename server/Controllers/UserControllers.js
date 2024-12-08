const user = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { conModel, conversation } = require("../models/conversationModel");
const User = user.user;
exports.Register = async (req, res) => {
  console.log(req.file);
  const { name, email, password } = req.body;
  const checkname = await User.findOne({ name });
  if (checkname)
    return res.json({ msg: "Username Already present", status: false });
  const chechemail = await User.findOne({ email });
  if (chechemail)
    return res.json({ msg: "Email Already present", status: false });
  // const hashpasword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    name,
    password,
    file: req.file,
  });
  user.save().then((data) => console.log("data save successfully"));
  delete user.password;
  return res.json({ status: true, user });
};

exports.Login = async (req, res) => {
  const { name, password } = req.body;
  let validUser = await User.findOne({ name });
  const payload = validUser._id;
  if (!validUser)
    return res.json({ msg: "username and password is invalid", status: false });
  const ispasswordvalid = await bcrypt.compare(password, validUser.password);
  if (!ispasswordvalid) {
    return res.json({ msg: "invalid creadentials", status: false });
  }
  const generateAccessToken = () => {
    return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  };
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };
  const accesstoken = generateAccessToken();
  validUser.accesstoken = accesstoken;
  await validUser.save({ validateBeforeSave: false });
  delete validUser.password;
  return res
    .cookie("accesstoken", accesstoken, options)
    .json({ status: true, validUser, accesstoken });
};
exports.getData = async (req, res) => {
  const data = await User.find();
  return res.json(data);
};
//secure routes
exports.logout = async (req, res) => {
  const user = await User.findOne({ accesstoken: req.body.token });
  const resdata = await User.findByIdAndUpdate(user._id, {
    $set: { accesstoken: "undefine" },
  });
};
exports.getAllMsg = async (req, res) => {
  try {
    let recieverId = req.params.id;
    let senderId = req.validUser._id;
    let isConversation = await conversation
      .findOne({
        members: { $all: [recieverId, senderId] },
      })
      .populate("messages");
    if (!isConversation) {
      res.json({ msg: "error msg not get" }).status(false);
    }
    res.json(isConversation?.messages).status(true);
  } catch (error) {
    console.log("some error occure", error);
    res.json({ data: [] }).status(false);
  }
};
