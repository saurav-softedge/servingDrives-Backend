const signUpdb = require("../Model/signupmodel");
const signupOTPverification = require("../Model/signupOTPverification");
const nodemailer = require("nodemailer");
const webToken = require("../middleware/webtokenMiddleware");

const sendOTPVerificationEmail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: req.email,
      subject: "Verify your email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process</p><p>This code<b> expires in 1 hour</b></P>`,
    };
    const newOtpVaerification = await new signupOTPverification({
      userId: req._id,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOtpVaerification.save();
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      status: "Pending",
      message: "Verification OTP Email Sent",
      data: {
        userId: req._id,
        email: req.email,
      },
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.phoneNumber) {
    res.status(400).send({ message: "Please provide all the required field" });
    return;
  }
  const isExisting = await signUpdb.find({ email: req.body.email });
  if (isExisting.length > 0) {
    res.status(400).json({ message: "user already exist" });
    return;
  } else {
    const signUpData = new signUpdb({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      verified: false,
    });
    signUpData
      .save()
      .then((data) => {
        //res.send(data);
        sendOTPVerificationEmail(data, res);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occured cannot sign up try again!",
        });
      });
  }
};

exports.verifyEmailOtp = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const signupOTPverificationRecords = await signupOTPverification.find({
        userId,
      });
      if (signupOTPverificationRecords.length <= 0) {
        throw new Error(
          "Account reacord doesn't exist or has been verified already.Please signup or login"
        );
      } else {
        const { expiresAt } = signupOTPverificationRecords[0];
        const OTP = signupOTPverificationRecords[0].otp;
        if (expiresAt < Date.now()) {
          await signupOTPverification.deleteMany({ userId });
          throw new Error("Code has expired. Please request again");
        } else {
          const validOtp = otp == OTP;
          if (!validOtp) {
            throw new Error("Invalid code passed. Check your inbox");
          } else {
            await signUpdb.updateOne({ _id: userId }, { verified: true });
            await signupOTPverification.deleteMany({ userId });
            const token = webToken.createToken(userId);
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 60 * 60 * 1000,
            });
            res.json({
              status: "Verified",
              message: "User email verified successfully",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.resendOtpVerificationCode = async (req, res) => {
  res.send("Hello");
};
