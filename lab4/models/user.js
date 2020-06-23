const fileName = "./data/users.json";
const fs = require('fs');

class User {
    constructor(id, login, role, fullName, registeredAt, avaUrl, isDisabled) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.fullName = fullName;
        this.registeredAt = registeredAt;
        this.avaUrl = avaUrl;
        this.isDisabled = isDisabled;
    }

    static getById(id, callback)
    {
        fs.readFile('data/users.json', function(err, data) {
            if (err) 
                callback(err)
            const object = JSON.parse(data)
            let user = null

            for (let i in object.items) 
            {
                if (object.items[i].id == id)
                    user = object.items[i]
            }
            if (user == null)
                callback(new Error("USER NOT FOUND"))
            else 
                callback(null, user)
        })
    } 
 
    static getAll(callback)
    {
        fs.readFile('data/users.json', function(err, data) {
            if (err) 
                callback(err)
            const object = JSON.parse(data)
            let list = []

            for (let i in object.items) 
                list.push(object.items[i])
            if (list == null)
                callback(new Error("!!!"))
            else 
                callback(null, list)
        })
    }
 };
 
 module.exports = User;