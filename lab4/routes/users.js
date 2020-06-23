const express = require('express')
const users = require('../models/user')
const usersJSON = require('../data/users');
const router = express.Router()

router.get('/users', function(req, res) {
  res.render('users', {users: usersJSON});
});

router.get("/users/:id", function (req, res) {
  const userId = parseInt(req.params.id);
  users.getById(userId, function(err, user) {
      if (err) res.status(500).send(err.toString());
      else
      {
          if (!user) res.sendStatus(404);
          else 
          {
              res.render('user', {
                          user: user,
                          imgSrc: user.avaUrl
              })
          }
      }
  })
})

router.get("/api/users", function(req, res) {
  res.end(JSON.stringify(usersJSON))
})
router.get('/api/users/:id', function(req, res) {
  const user = usersJSON.items[req.params.id]
  if (user === void(0))
  {
      console.log("Error: wrong user id")
      res.status(404).send("Error 404")
  }
  else 
  {
      console.log("No error in getById")
      res.end(JSON.stringify(user))
  }
})

module.exports = router
