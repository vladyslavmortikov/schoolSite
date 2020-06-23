const user = require('./models/user');
const news = require('./models/news');
const mark = require('./models/mark');


const rl = require('readline-sync');

while (1) {
    let inputString = rl.question('What are you want to do? ')
    let separator = '/';
    let strArr = inputString.split(separator);

    if (inputString == 'users') {
        console.clear();
        console.log('\n\nThis is users menu\n\n');
        console.log(user.getAll());
    } else if (inputString == 'marks') {
        console.clear();
        console.log('\n\nThis is marks menu\n\n');
        console.log(mark.getAll());

        console.log('\nmarks/get/{id} - to get full information about mark by id');
        console.log('marks/update/{id} - to get full information about mark by id');
        console.log('marks/delete/{id} - to delete mark by id');
        console.log('marks/insert - to create new mark and insert it\n');
    } else if (inputString == 'marks/insert') {
        console.clear();
        console.log('\nCreating new mark menu\n')
        let userId = rl.question('Enter userId: ');
        let subject = rl.question('Enter subject: ');
        let value = rl.question('Enter mark: ');
        let description = rl.question('Enter description: ');
        let date = new Date();

        date.toISOString();

        insertMark = new mark(0, Number(userId), subject, Number(value), description, date);
        let newId = mark.insert(insertMark);
        console.log('Mark was inserted with id: ' + newId);
    } else if (strArr[0] == 'marks' && strArr[1] == 'get') {
        let getId = Number(strArr[2]);
        if (mark.getById(getId) != undefined) {
            console.log(mark.getById(getId));
        } else {
            console.log('Please, try again... This ID is undefined.');
        }
    } else if (strArr[0] == 'marks' && strArr[1] == 'delete') {
        console.clear();
        let deleteId = Number(strArr[2]);
        if (mark.getById(deleteId) != undefined) {
            mark.getById(deleteId);
            mark.deleteById(deleteId);
            console.log('Is deleted!')
        } else {
            console.log('Please, try again... This ID is undefined.');
        }
    } else if (strArr[0] == 'marks' && strArr[1] == 'update') {
        console.clear();
        let updateId = Number(strArr[2]);
        if (mark.getById(updateId) != undefined) {

            console.log(mark.getById(updateId));

            console.log('\nUpdating menu\n');

            let userId = rl.question('Enter new userId: ');
            let subject = rl.question('Enter new subject: ');
            let value = rl.question('Enter new mark: ');
            let description = rl.question('Enter new description: ');
            let date = new Date();
            date.toISOString();

            updateMark = new mark(updateId, Number(userId), subject, Number(value), description, date);
            mark.update(updateMark);
            console.log('\nUpdated mark:\n')
            console.log(mark.getById(updateId));
        } else {
            console.log('Please, try again... This ID is undefined.');
        };
    } else if (strArr[0] == 'users' && strArr[1] == 'get') {
        let getId = Number(strArr[2]);
        if (user.getById(getId) != undefined) {
            console.log(user.getById(getId));
        } else {
            console.log('Please, try again... This ID is undefined.');
        }
    } else if (inputString == 'exit') {
        console.clear();
        console.log('Bye!')
        process.exit();
    }
    else {
        console.log('Please, check your input and try again');
    }
}
