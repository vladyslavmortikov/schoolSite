const User = require('../models/user');
const express = require('express');
const router = express.Router();
const auth = require('./auth')


router.get('/users', auth.checkAdmin, function (req, res, next) {
    User.schema.methods.getAll()
        .then((users) => res.render('users/users', { users: users, user: req.user }))
        .catch(err => res.status(500).send(err.toString()))
});

router.get('/users/:id', auth.checkAuth, function (req, res, next) {
    User.schema.methods.getById(req.params.id)
        .then(user => {
            console.log(user)
            if (user != undefined) {
                res.render('users/user', {
                    user: req.user,
                    previewUser: user
                })
            }
            else
                res.sendStatus(404)
        })
        .catch(err => res.status(500).send(err.toString()));
})

router.post('/users/:id', auth.checkAdmin, function (req, res, next) {
    User.schema.methods.getById(req.params.id)
        .then(user => {
            if (user.role)
                user.role = 0;
            else
                user.role = 1;
            return (User.schema.methods.update(user))
        })
        .then((user) => {
            console.log('new:')
            console.log(user)
            res.render('users/user', {
                user: req.user,
                previewUser: user
            })
        })
        .catch(err => res.status(500).send(err.toString()));
});


module.exports = router;   
