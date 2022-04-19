const GoogleStrategy = require("passport-google-oauth20").Strategy;
const signUpdb = require("../Model/signupmodel");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          phoneNumber: profile.phoneNumber,
          verified: profile.emails[0].verified,
        };
        try {
          let user = await signUpdb.findOne({ email: profile.emails[0].value });
          if (user) {
            done("user exists", user);
          } else {
            user = await signUpdb.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    signUpdb.findById(id, (err, user) => done(err, user));
  });
};
