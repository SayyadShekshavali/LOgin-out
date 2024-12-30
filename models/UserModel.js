import pkg from "jsonwebtoken";
const { verify } = pkg;

import { mongoose } from "mongoose";
import mongodb from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: Number,
    require: true,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountverified: {
    type: Boolean,
    default: false,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpire: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
