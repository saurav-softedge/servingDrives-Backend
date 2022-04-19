const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const validatePhoneNumber = (val) => {
  const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  return re.test(val);
};

const SignUpSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(v) {
      if (!validator.isEmail(v)) {
        throw new Error("Email Invalid");
      }
    },
  },
  phoneNumber: {
    type: Number,
    validate: [validatePhoneNumber, "Invalid Phone number"],
    match: [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Invalid Phone number"],
  },
  verified: Boolean,
});

const signUpdb = mongoose.model("users", SignUpSchema);

module.exports = signUpdb;
