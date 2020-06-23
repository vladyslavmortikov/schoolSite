const mongoose = require('mongoose');
const fs = require('fs');

const UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    role: {type: Number, required: true},
    fullName: {type: String, required: true},
    registeredAt: {type: Date, default: Date.now},
    avaUrl: {type: String}
});
   
const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(id, login, role, fullName, registeredAt, avaUrl) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.fullName = fullName;
        this.registeredAt = registeredAt;
        this.avaUrl = avaUrl;
    }

    static getAll()
    { 
      return UserModel.find();  
    }

    static getById(id)
    {
        return UserModel.findById(id);
    }
 };
 
 module.exports = User;