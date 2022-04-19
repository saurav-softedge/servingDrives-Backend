const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signupOTPverificationSchema = new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const signupOTPverification = mongoose.model(
  "userverifications",
  signupOTPverificationSchema
);

module.exports = signupOTPverification;
