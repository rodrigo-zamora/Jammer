const express = require('express');
const router = express.Router();

const passport = require('passport');

module.exports = router;

router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get(
    '/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        console.log(req.query.code);
        //res.redirect('https://jammer-streaming.herokuapp.com/');
        res.redirect('http://localhost:4200')
    }
);

router.get('/verifyLogin', (req, res) => {
    console.log('verifyLogin from route: ' + req.user);
    console.log('isAuthenticated: ' + req.isAuthenticated());
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Not authorized');
    }
});

router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).send('Logged out');
    } else {
        res.status(401).send('Not authorized');
    }
});

module.exports = router;