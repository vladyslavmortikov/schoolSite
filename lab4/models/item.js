const fs = require('fs');

class Item {
    constructor(id, title, preview, photo, text, postedAt) {
        this.id = id;
        this.title = title;
        this.preview = preview;
        this.photo = photo;
        this.text = text;
        this.postedAt = postedAt;
    }

    static getById(id, callback) {
        fs.readFile('data/items.json', function (err, data) {
            if (err)
                callback(err);
            const object = JSON.parse(data);
            let item = null;

            for (let i in object.items) {
                if (object.items[i].id == id)
                    item = object.items[i];
            }
            if (item == null)
                callback(new Error("Новину не знайдено..."));
            else
                callback(null, item);
        })
    }

    static getAll(callback) {
        fs.readFile('data/items.json', function (err, data) {
            if (err)
                callback(err);
            const object = JSON.parse(data);
            let list = [];

            for (let i in object.items)
                list.push(object.items[i]);
            if (list == null)
                callback(new Error("Новин немає..."));
            else
                callback(null, list);
        })
    }

    static insert(item, callback) {
        fs.readFile('data/items.json', function (err, data) {
            if (err)
                callback(err);
            console.log(item);
            const object = JSON.parse(data);
            item.id = object.nextId;
            object.nextId++;
            object.amount++;
            object.items.push(item);
            let string = JSON.stringify(object, null, 1);
            fs.writeFile('data/items.json', string, function (err) {
                if (err)
                    callback(err);
            })
            callback(null, item.id);
        })
    }

    static update(mark, callback) {
        fs.readFile('data/items.json', function (err, data) {
            if (err)
                callback(err);
            else {
                const object = JSON.parse(data);
                for (let i in object.items) {
                    if (object.items[i].id == item.id)
                        object.items[i] = item;
                }
                let string = JSON.stringify(object, null, 1);
                fs.writeFile('data/items.json', string, function (err) {
                    if (err)
                        callback(err);
                })
            }

        })
    }

    static deleteById(id, callback) {
        fs.readFile('data/items.json', function (err, data) {
            if (err)
                callback(err);
            const object = JSON.parse(data);
            object.amount--;
            for (let i in object.items) {
                if (object.items[i].id === id)
                    object.items.splice(i, 1);
            }
            let string = JSON.stringify(object, null, 1);
            fs.writeFile('data/items.json', string, function (err) {
                if (err)
                    callback(err)
            });
        });
    }

};



module.exports = Item;
