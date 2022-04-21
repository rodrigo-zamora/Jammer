const User = require('../models/User');
const List = require('../models/List');

function restore() {
    backupUser = {
        UUID: '77f38fc2-c53f-4637-9c57-d8529cc02bc1',
        firstName: 'Rodrigo',
        lastName: 'Zamora',
        email: 'rodrigo.zamora@hotmail.com',
        password: '123456',
        createdAt: Date.parse('2022-03-27T23:03:13.652+00:00'),
        updatedAt: Date.parse('2022-03-28T02:16:03.133+00:00')
    };
    let list = new List({
        name: 'Recently Watched',
        movies: null,
        isShared: false,
        sharedWith: []
    });
    list.save();
    User.create(backupUser, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            newUser.list.push(list.UUID);
            console.log('User created: ', user);
        }
    });
}

module.exports = {
    restore
};