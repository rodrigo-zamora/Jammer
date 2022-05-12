const passport = require('passport');

const User = require('../models/User');
const List = require('../models/List');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET || '',
            //callbackURL: 'https://backend-jammer.herokuapp.com/auth/google/callback'
            callbackURL: 'http://https://backend-jammer.herokuapp.com//auth/google/callback'
        },
        async function (accessToken, refreshToken, profile, done) {
            let user = await User.findOne({
                UUID: profile.id
            });
            if (user) {
                return done(null, user);
            } else {
                let list = {
                    name: 'Historial',
                    movies: [],
                    isShared: false,
                    sharedWith: []
                }
                let recentlyWatchedList = await new List(list);
                let newUser = await new User({
                    UUID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    imageURL: profile.photos[0].value
                });
                newUser.lists.push(recentlyWatchedList.UUID);
                await recentlyWatchedList.save();
                await newUser.save();
                return done(null, newUser);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.UUID);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        UUID: id
    }, function (err, user) {
        done(err, user);
    });

});