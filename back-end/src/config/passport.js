const passport = require('passport');

const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET || '',
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('Creating user with profile: ', profile);
            let user = User.findOne({
                email: profile.emails[0].value
            });
            user.then(user => {
                if (user) {
                    console.log('A user with that email already exist: ', user);
                    return done(null, user);
                } else {
                    console.log('Creating new user');
                    User.create({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        imageURL: profile.photos[0].value
                    });
                }
            })
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.UUID);
});
passport.deserializeUser(function (UUID, done) {
    User.findOne(UUID)
        .then(user => done(null, user))
        .catch(err => done(err));
});

module.exports = {
    serializeUser: passport.serializeUser,
    deserializeUser: passport.deserializeUser
}