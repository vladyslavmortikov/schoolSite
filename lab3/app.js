const express = require('express');
const path = require('path');
const User = require("./models/user.js");
const Items = require("./models/item.js");
const mustache = require("mustache-express");

const app = express();

const viewsDir = path.join(__dirname, 'views');
app.engine("mst", mustache(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/users', function (req, res) {
    let userList = {};
    userList.users = User.getAll();
    res.render('users', userList);
});

app.get('/users/:id', function (req, res) {
    let id = parseInt(req.params.id);
    const user = User.getById(id);
    if (typeof (user) === "undefined") {
        res.sendStatus(404);
    }
    else {
        res.render('user', user);
    }
});

app.get('/items', function (req, res) {
    let itemsList = {};
    itemsList.items = Items.getAll();
    res.render('items', itemsList);
});

app.get('/items/:id', function (req, res) {
    let id = parseInt(req.params.id);
    const item = Items.getById(id);
    if (typeof (item) === "undefined") {
        res.sendStatus(404);
    }
    else {
        res.render('item', item);
    }
});

app.get('/philosophy', function (req, res) {
    res.render('philosophy');
});

app.get('/handbook', function (req, res) {
    res.render('handbook');
});


app.get('/enrolment', function (req, res) {
    res.render('enrolment');
});



app.get('/api/users', function (req, res) {
    const users = User.getAll();
    res.send(users);
});

app.get("/api/user/:id", function (req, res) {
    const self = User.getById(parseInt(req.params.id));

    if (typeof (self) === "undefined") {
        res.sendStatus(404);
    }
    else {
        res.send(self);
    }
});

app.listen(8080, function () {
    console.log('Example app listening on port 3000');
});