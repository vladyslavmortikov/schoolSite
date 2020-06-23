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

   
    static getById(id, callback)
    {
        fs.readFile('data/marks.json', function(err, data) {
            if (err) 
                callback(err)
            const object = JSON.parse(data)
            let mark = null

            for (let i in object.items) 
            {
                if (object.items[i].id == id)
                    mark = object.items[i]
            }
            if (mark == null)
                callback(new Error("MARK NOT FOUND"))
            else 
                callback(null, mark)
        })
    }
 
    static getAll(callback)
    {
        fs.readFile('data/marks.json', function(err, data) {
            if (err) 
                callback(err)
            const object = JSON.parse(data)
            let list = []

            for (let i in object.items) 
                list.push(object.items[i])
            if (list == null)
                callback(new Error("????"))
            else 
                callback(null, list)
        })
    }

    static insert(mark, callback)
    {
        fs.readFile('data/marks.json', function(err, data) {
            if (err) 
                callback(err)
                console.log(dish)
            const object = JSON.parse(data)
            dish.id = object.nextId
            object.nextId++                                      
            object.amount++
            object.items.push(mark)
            let string = JSON.stringify(object, null, 1)
            fs.writeFile('data/marks.json', string, function(err) {
                if (err)
                    callback(err)             
            })
            callback (null, mark.id)
        })
    }

    static update(mark, callback)
    {
        fs.readFile('data/marks.json', function(err, data) {
            if (err) 
                callback(err)
            else
            {
                const object = JSON.parse(data)
                for (let i in object.items)
                {
                    if (object.items[i].id == mark.id)
                        object.items[i] = mark
                }
                let string = JSON.stringify(object, null, 1)
                fs.writeFile('data/marks.json', string, function(err) {
                    if (err)
                        callback(err)             
                })
            }
            
        })
    }

    static deleteById(id, callback)
    {
        fs.readFile('data/marks.json', function(err, data) {
            if (err) 
                callback(err)
            const object = JSON.parse(data)
            object.amount --
            for (let i in object.items)
            {
                if (object.items[i].id === id)
                    object.items.splice(i, 1)
            }
            let string = JSON.stringify(object, null, 1)
            fs.writeFile('data/marks.json', string, function(err) {
                if (err)
                    callback(err)             
            })
        })
    }

 };

module.exports = Mark;
