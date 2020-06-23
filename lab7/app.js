const express = require('express');
const path = require('path');
const busboyBodyParser = require('busboy-body-parser');
const app = express();
const mustache = require("mustache-express");
const mongoose = require('mongoose');
const config = require('./config');
const url = config.DatabaseUrl;
const serverPort = config.ServerPort;
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const newsRoutes = require('./routes/items');
const marksRoutes = require('./routes/marks')

app.use(cookieParser());
app.use(session({
    secret: "vladyslav_secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.schema.methods.getById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null))
});

passport.use(new LocalStrategy((username, password, done) => {
    User.schema.methods.getAll()
        .then(users => {
            let us;
            for (let user of users) {
                if (user.login == username && user.password == authRoutes.sha512(password, config.serverSalt).passwordHash) {
                    us = user;
                }
            }
            if (us != undefined)
                return done(null, us)
            else {
                return done("User not found", null)
            }
        })
        .catch((err) => done(err, null))
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));

const databaseUrl = config.DatabaseUrl;
const port = config.ServerPort;

const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(databaseUrl, connectOptions)
    .then(() => console.log(`Database connected on ${databaseUrl}`))
    .then(() => app.listen(port, function () { console.log(`Example app is working on ${port} port`) }))
    .catch(err => console.log(`Error: ${err}`));

app.use(busboyBodyParser());

app.use('/static', express.static('public'));

const viewsDir = path.join(__dirname, 'views');
app.engine("mst", mustache(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');

app.use('/', usersRoutes)
app.use('/', newsRoutes);
app.use('/', marksRoutes);
app.use('/', authRoutes)

app.get('/', function (req, res) {
    res.render('index', {
        user: req.user
    });
});

app.get("/philosophy", function (req, res) {
    res.render('philosophy', {
        user: req.user
    });
});

app.get("/enrolment", function (req, res) {
    res.render('enrolment', {
        user: req.user
    });
});

app.get("/handbook", function (req, res) {
    res.render('handbook', {
        user: req.user
    });
});


