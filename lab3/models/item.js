const newsFileName = "./data/items.json";
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

    static insert(item) {
        let dataRead = read(newsFileName);
        item.id = dataRead.nextId;
        dataRead.items.push(item);
        dataRead.nextId++;
        write(dataRead);
        return item.id;
    }

    static getAll() {
        let data = fs.readFileSync(newsFileName, "utf-8");
        return (JSON.parse(data).items);
    }

    static getById(id) {
        let elementById = read(newsFileName);
        const item = elementById.items;
        return item.find(x => x.id === id);
    }

    static update(item)
    {
        let element = read(newsFileName)
        for (let i in element.items)
        {
            if (element.items[i].id == item.id)
                element.items[i] = item;
        }
        write(element);
    }

    static deleteById(id) {
        let data = read(newsFileName);
        let deletedData;
        for (let i = 0; i < data.items.length; i++) {
            if (data.items[i].id === id) {
                deletedData = data.items.splice(i, 1);
            }
            if (deletedData !== undefined) {
                write(data);
            }
        }
        return deletedData;
    }
}

function read(path) {
    let dataRead = fs.readFileSync(path, "utf-8");
    return JSON.parse(dataRead);
}

function write(elements) {
    let fileContent = JSON.stringify(elements, null, 4);
    fs.writeFileSync(marksFileName, fileContent);
}

module.exports = Item;
