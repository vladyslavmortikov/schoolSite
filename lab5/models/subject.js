const mongoose = require('mongoose');
const fs = require('fs');

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const SubjectModel = mongoose.model('Subject', SubjectSchema);

class Subject {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static getAll() {
        return SubjectModel.find();
    }

    static getById(id) {
        return SubjectModel.findById(id);
    }

    static insert(newSubject) {
        return new SubjectModel(newSubject).save();
    }

    static update(newSubject) {
        return SubjectModel.resolve(SubjectModel.findOneAndUpdate({_id:newSubject.id},{title:newSubject.name}));
    }

    static deleteById(id) {
        return ItemModel.deleteOne({_id:id});
    }
};

module.exports = Subject;