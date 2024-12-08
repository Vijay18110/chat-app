const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  accesstoken: String,
  file: String,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
exports.user = mongoose.model("user", userSchema);
