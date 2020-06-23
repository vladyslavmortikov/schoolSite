const express = require('express')
const router = express.Router()
const items = require('../models/item')
const itemsJSON = require('../data/items')
const bodyParser = require('body-parser');
const multer = require("multer")
const fs = require('fs');
const busboyBodyParser = require("busboy-body-parser");
const busboy = require('connect-busboy');


router.use(busboy());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));
router.use(busboyBodyParser({ limit: '5mb' }));
router.use(express.static('fs'));


router.get('/news/new', (req, res) => {
    res.render('new');
});

router.post('/news/new', (req, res) => {
    
    let newPath = __dirname + "/data/fs/";

    let buf = new Buffer(req.files.pic.data, 'base64');

    fs.writeFile(newPath + req.files.pic.name, buf, function (err) {
        if (err)
            throw (err);
    })

    let photo = `./data/fs/` + req.files.pic.name;


    let date = new Date();
    date.toISOString();

    let newItem = new items(0, req.body.title, req.body.preview, photo, req.body.text, date);

    items.insert(newItem, function (err, result) {
        if (err) {
            console.log("Error in inserting");
            res.redirect('/')
        }
        else {
            res.redirect(result);
        }
    });
});

router.post('/news/:id', (req, res) => {
    items.deleteById(parseInt(req.params.id), function (err, result) {
        if (err) {
            console.log(err.toString());
        }
    });
    res.redirect("/news=1");
});

router.get("/news/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    items.getById(itemId, function (err, item) {
        if (err) res.status(500).send(err.toString());
        else {
            if (!item) res.sendStatus(404);
            else {
                res.render('item', {
                    item: item,
                    photo: item.photo,
                    date: item.postedAt,
                    title: item.title,
                    text: item.text,
                    id: req.param.id
                })
            }
        }
    })
});

router.get('/news=:id', (req, res) => {
    let pagItems = new Array;
    const currPage = parseInt(req.params.id);
    let nextPage = currPage + 1;
    let prevPage = 1;
    let pageAm = Math.ceil(parseInt(itemsJSON.amount) / 2)
    if (pageAm === 0) {
        pageAm++;
    }
    if (pageAm > currPage) {
        nextPage = currPage + 1;
    }
    if (currPage > 1) {
        prevPage = currPage - 1;
    }
    if (req.query.search === undefined || req.query.search === '') {
        items.getAll(function (err, allNews) {
            if (err) {
                console.log(err.toString())
            }
            else {
                for (let i = (currPage - 1) * 2; i < currPage * 2; i++) {
                    if (i < allNews.length) {
                        pagItems.push(allNews[i])
                    }
                    if (i === currPage * 2 - 1) {
                        res.render('items', {
                            page: currPage,
                            nextPage: nextPage,
                            prevPage: prevPage,
                            items: pagItems,
                            pageAmount: pageAm
                        })
                    }
                }
            }
        })
    }
    else {
        items.getAll(function (err, allNews) {
            if (allNews) {
                allNews.forEach(element => {
                    if (element.name.toLowerCase().indexOf(req.query.search.toLowerCase()) > -1) {
                        pagItems.push(element)
                    }
                })
                res.render('items', {
                    page: 1,
                    nextPage: nextPage,
                    prevPage: prevPage,
                    items: pagItems,
                    pageAmount: 1
                })
            }
        })
    }
});

module.exports = router