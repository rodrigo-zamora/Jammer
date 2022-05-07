const passport = require('passport');

const User = require('../models/User');
const List = require('../models/List');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET || '',
            callbackURL: 'https://backend-jammer.herokuapp.com/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log('working');
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
            let user = await User.findOne({
                UUID: profile.id
            });
            if (user) {
                console.log('user found');
                return done(null, user);
            } else {
                console.log('Creating new user');
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
                console.log('New user created');
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
    }).then(user => {
        done(null, user);
    }).catch(err => {
        done(err, null);
    });
});