const marksFileName = "./data/marks.json";
const fs = require('fs');

class Mark {
    constructor(id, userId, subject, value, description, date) {
        this.id = id;
        this.userId = userId;
        this.subject = subject;
        this.value = value;
        this.description = description;
        this.date = date;
    }

    static insert(mark) {
        let dataRead = read(marksFileName);
        mark.id = dataRead.nextId;
        dataRead.items.push(mark);
        dataRead.nextId++;
        write(dataRead);
        return mark.id;
    }

    static getAll() {
        let data = fs.readFileSync(marksFileName, "utf-8");
        return (JSON.parse(data).items);
    }

    static getById(id) {
        let elementById = read(marksFileName);
        const mark = elementById.items;
        return mark.find(x => x.id === id);
    }

    static update(mark)
    {
        let element = read(marksFileName)
        for (let i in element.items)
        {
            if (element.items[i].id == mark.id)
                element.items[i] = mark;
        }
        write(element);
    }

    static deleteById(id) {
        let data = read(marksFileName);
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

module.exports = Mark;
