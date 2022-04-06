const passport = require('passport');

const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('Creating user with profile: ', profile);
            try {
                User.findOne({
                    email: profile.emails[0].value
                }).then(newUser => {
                    if (newUser) {
                        console.log('User already exists');
                        done(null, newUser);
                    } else {
                        User.create({
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            imageURL: profile.photos[0].value
                        }).then(user => {
                            console.log('User created');
                            done(null, user);
                        }).catch(err => {
                            console.log('Error creating user: ' + err.message);
                            done(err);
                        });
                    }
                })
            } catch (err) {
                console.log('Error creating user: ', err);
                done(err);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.find(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});