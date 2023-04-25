const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const bcrypt=require("bcryptjs");

// const AppError = require("../middleWare/errorMiddleware");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = await req.cookies.token;

    if (!token) {
      res.status(401);
      console.log("Not cookie");
      throw new Error("Not Cookie 1");
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    alert(error);
    res.status(401);
    throw new Error("Not cookie 2");
  }
});

module.exports = protect;
