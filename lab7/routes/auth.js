const User = require('../models/user');
const express = require('express');
const router = express.Router();
const config = require('../config');
const cloudinary = require('cloudinary').v2;
const passport = require('passport');
const crypto = require('crypto');

router.sha512 = function (password) {
    const hash = crypto.createHmac('sha512', config.serverSalt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: config.serverSalt,
        passwordHash: value
    };
};

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
})

router.get('/auth/login', function (req, res, next) {
    res.render('login');
});

router.get('/auth/register', function (req, res, next) {
    res.render('register');
});

router.post('/auth/register', function (req, res, next) {
    let userFullName = req.body.name;
    let userLogin = req.body.login;
    let pass = req.body.pass;
    let pass2 = req.body.re_pass;

    User.findOne({ 'login': userLogin }, (err, user) => {
        if (err) {
            res.status(500).send(err.toString());
        }
        if (user) {
            res.redirect('/auth/register' + '?error=Username+is+already+taken');
        }
        else {
            if (pass === pass2) {
                let photoUrl = '../public/images/defuser.png';
                let passwordUser = router.sha512(pass).passwordHash;
                const newUser = {id: null, login: userLogin, password: passwordUser, fullName: userFullName, role: 0, registeredAt: Date.now(), photo: photoUrl, isDisabled: false};
                User.schema.methods.insert(newUser)
                .then(() => res.redirect('/auth/login'))
                .catch(err => res.status(500).send(err.toString()));
            }
            else {
                res.render('register' + '?error=Passwords+do+not+match');
            }
        }
    });

});

router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

router.post('/auth/login',
    passport.authenticate('local'),
    (req, res) => res.redirect('/'));


router.checkAdmin = function (req, res, next) {
    if (!req.user) return res.sendStatus(401);
    if (req.user.role !== 1) return res.sendStatus(403);
    next();
}

router.checkAuth = function (req, res, next) {
    if (!req.user) return res.sendStatus(401);
    next();
}

module.exports = router;