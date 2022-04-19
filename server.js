const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const connectDB = require("./Server/Database/connection");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const app = express();
dotenv.config({ path: "config.env" });

require("./Server/passportConfig/passport")(passport);

const port = process.env.PORT || 3000;

connectDB();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./Server/Routes/router"));

app.listen(port, () => {
  console.log(`server is running on  http://localhost:${port}`);
});
