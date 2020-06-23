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

    static getAll() {
        let dataRead = fs.readFileSync(fileName, 'utf8');
        return (JSON.parse(dataRead).items);
    }

    static getById(id) {
        let elementById = read(fileName);
        const user = elementById.items;
        return user.find(x => x.id === id);
    }
}

function read(path) {
    let dataRead = fs.readFileSync(path, "utf-8");
    return JSON.parse(dataRead);
}

module.exports = User;
