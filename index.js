const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const routes = require('./routes/index');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/userModel');
const { generateToken } = require('./helpers');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: CLIENT_URL }));
app.use(session({ secret: JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


// Passport.js configuration
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      await user.save();
    }else{
      user.googleId = profile.id;
      await user.save();
    }
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
}
));

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


// Routes
app.get("/", (req, res) => {
  res.send('Homepage APIs');
});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login` }),
  async (req, res) => {
    try {
      const token = generateToken(req.user);
      const redirectUrl = `${CLIENT_URL}/login?token=${token}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error(error);
      res.redirect(`${CLIENT_URL}/login`);
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });
