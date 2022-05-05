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
        res.redirect('/');
    }
);

router.get('/verifyLogin', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Not authorized');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.render('home');
});

module.exports = router;