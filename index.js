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
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

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
  async function (accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        await user.save();
      } else {
        user.googleId = profile.id;
        await user.save();
      }
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Swagger setup
const options = {
  definition: {
    "openapi": "3.0.3",
    "info": {
      "description": "NodeJS API documentation of SSV",
      "version": "1.0.0",
      "title": "SSV APIs"
    },
    "security": [
      {
        "BearerAuth": []
      }
    ],
    "components": {
      "securitySchemes": {
        "BearerAuth": {
          "name": "Authorization",
          "in": "header",
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "Enter your bearer token in the format Bearer <token>"
        }
      }
    }
  }
  ,
  apis: ["./swagger/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Routes
app.get("/", (req, res) => {
  res.send('Demo APIs - Pay Reminder. <a href="/api-docs/">Test APIs here</a>.');

});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login` }),
//   async (req, res) => {
//     try {
//       const token = generateToken(req.user);
//       const redirectUrl = `${CLIENT_URL}/login?token=${token}`;
//       res.redirect(redirectUrl);
//     } catch (error) {
//       console.error(error);
//       res.redirect(`${CLIENT_URL}/login`);
//     }
//   }
// );

app.get('/auth/google/callback', (req, res, next) => {
  console.log('Received redirect URI:', req.originalUrl);
  
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      console.error('Error during Google OAuth authentication:', err);
      // Redirect to an error page or handle the error as needed
      return res.redirect('/error');
    }
    if (!user) {
      console.error('Google OAuth authentication failed:', info.message);
      // Redirect to a login page or handle the authentication failure as needed
      return res.redirect('/login');
    }
    // If authentication is successful, log the user in and generate a token
    req.login(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        // Redirect to an error page or handle the error as needed
        return res.redirect('/error');
      }
      // Generate a token or perform any additional actions
      const token = generateToken(user);
      console.log('User logged in successfully:', user);
      // Redirect to the authenticated page with the token
      res.redirect(`/authenticated?token=${token}`);
    });
  })(req, res, next);
});

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
