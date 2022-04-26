const express = require('express');
const router = express.Router();

const passport = require('passport');

module.exports = router;

router.get('/login', (req, res) => {
    res.send('login');
});

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get(
    '/login/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        console.log(req.query.code);
        res.redirect('/');
    }
);

router.get('/verifyLogin', (req, res) => {
    if (req.isAuthenticated()) {
        res.header('name', req.user.name);
        res.header('img', req.user.imageUrl);
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