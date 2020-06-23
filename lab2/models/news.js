const newsFileName = "./data/news.json";
const fs = require('fs');

class News {
    constructor(id, title, preview, photo, rating, voted, postedAt) {
        this.id = id;
        this.title = title;
        this.preview = preview;
        this.photo = photo;
        this.rating = rating;
        this.voted = voted;
        this.postedAt = postedAt;
    }

    static insert(news) {
        let dataRead = read(newsFileName);
        news.id = dataRead.nextId;
        dataRead.items.push(news);
        dataRead.nextId++;
        write(dataRead);
        return news.id;
    }

    static getAll() {
        let data = read(newsFileName);
        return (JSON.parse(data).items);
    }

    static getById(id) {
        let elementById = read(newsFileName);
        const News = elementById.items;
        return News.find(x => x.id === id);
    }

    //isn`t working
    static update(news) {
        let data = read(newsFileName);
        for (let i in data.items) {
            if (data.items[i].id === id) {
                data.items[i] = news;
                write(data);
            } else
                return undefined;
        }
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
    let dataRead = fs.readFileSync(path);
    return JSON.parse(dataRead);
}

function write(elements) {
    let fileContent = JSON.stringify(elements, null, 4);
    fs.writeFileSync(newsFileName, fileContent);
}

module.exports = News;
