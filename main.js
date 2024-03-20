const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const { addUser, findUserByUsername } = require("./fakeDatabase");
const bodyParser = require("body-parser");
//login and session
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//hashing and encryption
const bcrypt = require("bcrypt");
//middleware
app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "hyper",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await findUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

// Passport serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await findUserByUsername(username);
  done(null, user);
});

app.post("/register", async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  if (await findUserByUsername(username)) {
    console.log("User already exists");
    return res.status(500).json("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = { username, password: hash };
  addUser(user);

  res.status(201).json("User registered successfully.");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Successful login for: " + req.user.username);
  res.json("Welcome " + req.user.username);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.json("Logged out successfully.");
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});
