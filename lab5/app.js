const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');
const itemsRoutes = require('./routes/items');
const marksRoutes = require('./routes/marks');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 4000;
const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialDir = path.join(viewsDir, 'partials');

const databaseUrl = 'mongodb://localhost:27017/lab5db';

const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(databaseUrl, connectOptions)
    .then(() => console.log(`Database connected on ${databaseUrl}`))
    .then(() => app.listen(port, function () { console.log(`Example app is working on ${port} port`)}))
    .catch(err => console.log(`Error: ${err}`));

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

app.get("/users", userRoutes);
app.get("/users/:id", userRoutes);
app.get("/api/users", userRoutes);
app.get("/api/users/:id", userRoutes);

app.get("/data/fs/:file", function (req, res) {
    res.sendFile(__dirname + "/data/fs/" + req.params.file.toString());
});

app.get("/news/:id/edit", itemsRoutes);
app.post("/news/:id/edit", itemsRoutes);
app.post("/news/:id/delete", itemsRoutes);
app.get("/news=:id", itemsRoutes);
app.get("/news/:id", itemsRoutes);
app.get("/news/new", itemsRoutes);
app.get("/news/fs/:name", itemsRoutes);
app.post("/news/new", itemsRoutes);
app.post("/news/:id", itemsRoutes);

app.get("/marks", marksRoutes);
app.get("/marks/:id", marksRoutes);
app.get("/marks/new", marksRoutes);
app.post("/marks/new", marksRoutes);
app.get("/marks/:id/edit", marksRoutes);
app.post("/marks/:id/edit", marksRoutes);
app.post("/marks/:id/delete", marksRoutes);


