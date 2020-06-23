const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get("/philosophy", function(req, res) {
  res.render('philosophy');
});

router.get("/enrolment", function(req, res) {
  res.render('enrolment');
});

router.get("/handbook", function(req, res) {
  res.render('handbook');
});


module.exports = router;
