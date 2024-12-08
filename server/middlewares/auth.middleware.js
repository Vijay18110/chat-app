const { ApiError } = require("../utills/ApiError.js");
const jwt = require("jsonwebtoken");
const user = require("../models/UserModel.js");
exports.verifyJWT = async (req, _, next) => {
  try {
    const token = req.body?.token;
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const validUser = await user.user
      .findById(decodedToken?.payload)
      .select("-password");
    if (!validUser) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.validUser = validUser;
    // console.log(req.validUser);
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
