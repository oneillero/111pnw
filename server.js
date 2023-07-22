// Import necessary modules and initialize express app
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true })); // Include credentials for the CORS policy
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define the member schema and model
const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
});

const Member = mongoose.model('Member', memberSchema);

// Helper function to encrypt passwords
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// Regular login strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const member = await Member.findOne({ email });

        if (!member) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isMatch = await bcrypt.compare(password, member.password);

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, member);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const existingMember = await Member.findOne({ googleId: profile.id });
  if (existingMember) {
    return done(null, existingMember);
  } else {
    const member = new Member({ name: profile.displayName, email: profile.emails[0].value, googleId: profile.id });
    await member.save();
    done(null, member);
  }
}));

// JWT strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: process.env.JWT_SECRET || 'YOUR_SECRET_OR_KEY',
    },
    (payload, done) => {
      Member.findById(payload.memberId, (err, member) => {
        if (err) {
          return done(err, false);
        }

        if (member) {
          return done(null, member);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

app.use(passport.initialize());

// Route to get authenticated user data
app.get("/api/user", passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Google OAuth login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ memberId: req.user._id }, process.env.JWT_SECRET || 'YOUR_SECRET_OR_KEY');
  res.cookie('jwt', token);
  res.redirect('/'); // Redirect user back to your app after successful login
});

// Helper function to handle member sign up
app.post('/api/members', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    console.log("password", password)
    // Encrypt the password before saving
    const hashedPassword = await encryptPassword(password);

    // Create a new member record
    const newMember = new Member({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new member to the database
    await newMember.save();

    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    console.error('Error during member sign up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to handle member login
app.post('/api/members/login', passport.authenticate('local', { session: false }), (req, res) => {
  try {
    console.log("req.user", req.user)
    // If the code reaches this point, the login was successful, and req.user contains the authenticated member.
    // We can generate a JWT token and send it in the response to the client.
    const token = jwt.sign({ memberId: req.user._id, memberName: req.user.name, memberEmail: req.user.email }, process.env.JWT_SECRET || 'YOUR_SECRET_OR_KEY');
    res.cookie('jwt', token);
    res.status(200).json({ message: 'Login successful.', member: req.user, jwt: token });
  } catch (error) {
    console.error('Error during member login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find({});
    console.log('members', members);
    res.status(200).json({ members });
  } catch (error) {
    console.error('Error getting members:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server and listen on the specified port
const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
