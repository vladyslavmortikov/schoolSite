const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/users', function (req, res) {
  User.getAll()
    .then(users => res.render('users/users', {
      users: users
    }))
    .catch(err => res.status(500).send(err.toString()));
});

router.get("/users/:id", function (req, res) {
  const userId = req.params.id;
  User.getById(userId)
    .then(user => {
      if (!user) {
        res.status(404).send(`User with id = ${userId} not found`);
      } else {
        res.render('users/user', {
          user: user
        });
      }
    })
    .catch(err => res.status(500).send(err.toString()));
});

router.get("/api/users", function (req, res) {
  res.end(JSON.stringify(usersJSON));
})

router.get('/api/users/:id', function (req, res) {
  const user = usersJSON.items[req.params.id];
  if (user === void (0)) {
    console.log("Error: wrong user id");
    res.status(404).send("Error 404");
  }
  else {
    console.log("No error in getById");
    res.end(JSON.stringify(user));
  }
})

module.exports = router;
