const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../db/models/user");

function initializeSetUp(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        // options for the google strat
        callbackURL: "/login/google/redirect",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our db
        User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              email: profile.emails[0].value,
              name: profile.displayName,
              googleId: profile.id,
            })
            .save()
            .then((newUser) => {
                done(null, newUser);
            });
          }
        });
      }
    )
  );
}

module.exports = initializeSetUp;
