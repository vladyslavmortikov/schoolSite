const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const usersRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');
const newsRoutes = require('./routes/items');
const bodyParser = require('body-parser');

const port = 7000;
const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialDir = path.join(viewsDir, 'partials');

app.listen(port, function () { console.log(`Example app is working on ${port} port`)});

app.engine('mst', mustache(partialDir));
app.set('views', viewsDir);
app.set('view engine', 'mst');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", indexRoutes);
app.get("/philosophy", indexRoutes);
app.get("/enrolment", indexRoutes);
app.get("/handbook", indexRoutes);

app.get("/users", usersRoutes);
app.get("/users/:id", usersRoutes);
app.get("/api/users", usersRoutes);
app.get("/api/users/:id", usersRoutes);

app.get("/data/fs/:file", function (req, res) {
    res.sendFile(__dirname + "/data/fs/" + req.params.file.toString());
});

app.get("/news/new", newsRoutes);
app.post("/news/new", newsRoutes);
app.get("/news/:id", newsRoutes);
app.post("/news/:id", newsRoutes);
app.get("/news=:id", newsRoutes);
app.get("/news/fs/:name", newsRoutes);
