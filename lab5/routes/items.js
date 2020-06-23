const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const multer = require("multer");
const fs = require('fs');
const bodyParser = require("body-parser");
const busboyBodyParser = require("busboy-body-parser");
const busboy = require('connect-busboy');


router.use(busboy());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));
router.use(busboyBodyParser({ limit: '5mb' }));
router.use(express.static('fs'));

router.get('/news/new', (req, res) => {
    res.render('items/new');
});

router.post('/news/new', (req, res) => {
    let newPath = "/home/vladislav/Desktop/KPI/webprogbase/labs/lab5/data/fs/";

    let buf = new Buffer(req.files.pic.data, 'base64');

    fs.writeFile(newPath+req.files.pic.name, buf,function(err){
        if (err)
            throw (err);
    })
    
    let photo = `http://localhost:4000/data/fs/` + req.files.pic.name;
    

    let newItem = new Item(0, req.body.title, req.body.preview, photo, req.body.text, );

    Item.insert(newItem)
        .then(item => res.render('items/item', {
            item: item
        }))
        .catch(err => res.status(500).send(err.toString()));
});

router.get("/news/:id/edit", function (req, res) {
    const newsId = req.params.id;
    Item.getById(newsId)
        .then(item => {
            if (!item) {
                res.status(404).send(`News with id = ${newsId} not found`);
            } else {
                res.render('items/edit', {
                    item: item
                });
            }
        })
        .catch(err => res.status(500).send(err.toString()));
});

router.get("/news/:id", function (req, res) {
    const newsId = req.params.id;
    Item.getById(newsId)
        .then(item => {
            if (!item) {
                res.status(404).send(`News with id = ${newsId} not found`);
            } else {
                res.render('items/item', {
                    item: item
                });
            }
        })
        .catch(err => res.status(500).send(err.toString()));
});

router.post("/news/:id/edit", (req, res) => {
    const itemId = req.params.id;
    
    let newPath = "/home/vladislav/Desktop/KPI/webprogbase/labs/lab5/data/fs/";

    let buf = new Buffer(req.files.pic.data, 'base64');

    fs.writeFile(newPath+req.files.pic.name, buf,function(err){
        if (err)
            throw (err);
    })
    
    let photo = `http://localhost:4000/data/fs/` + req.files.pic.name;
    let updItem = new Item(itemId, req.body.title, req.body.preview, photo, req.body.text);

    Item.update(updItem)
        .then(res.redirect("/news=1"))
        .catch(err => res.status(500).send(err.toString()));
});

router.post("/news/:id/delete", function (req, res) {
    const newsId = req.params.id;
    Item.deleteById(newsId)
        .then(res.redirect('/news=1'))
        .catch(err => res.status(500).send(err.toString()));
});


router.get('/news=:id', (req, res) => {
    Item.getAll()
        .then(items => res.render('items/items', {
            items: items
        }))
        .catch(err => res.status(500).send(err.toString()));
});

module.exports = router;