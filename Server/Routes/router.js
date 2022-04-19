const express = require("express");
const route = express.Router();
const signUpController = require("../controller/signupController");
const loginController = require("../controller/loginController");
const sellerRegistrationController = require("../controller/sellerRegistrationController");
const typeController = require("../controller/typeController");
const { requireAuth } = require("../middleware/authMiddleware");
const passport = require("passport");
const webToken = require("../middleware/webtokenMiddleware");
const { uploadMultiple } = require("../middleware/multerMiddleware");

//! SignUp API's
route.post("/signUp", signUpController.create);

route.post("/verifyotp", signUpController.verifyEmailOtp);

// route.post(
//   "/resendotpverificationcode",
//   signUpController.resendOtpVerificationCode
// );

route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);

route.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = webToken.createToken(req.user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    console.log(req.user._id);
    res.redirect("/");
  }
);

//! Login Apis

route.post("/login", loginController.login);

route.post("/loginverify", loginController.verifyLoginOtp);

//! Seller Registration API's
route.post(
  "/sellerregistration",
  requireAuth,
  uploadMultiple,
  sellerRegistrationController.sellerRegistration
);

//! Type Apis
route.get("/type", typeController.getType);
route.post("/type", typeController.postType);

route.get("/", (req, res) => {
  res.cookie("newUsser", false);
  res.json({
    message: "User not Logged In",
  });
});

module.exports = route;
