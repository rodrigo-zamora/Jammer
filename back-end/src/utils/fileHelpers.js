const User = require('../models/User');
const List = require('../models/List');

function restore() {
    let userUUID = '77f38fc2-c53f-4637-9c57-d8529cc02bc1';
    User.findOne({
        UUID: userUUID
    }).then(user => {
        console.log(`User with UUID ${userUUID} found`);
        backupUser = {
            firstName: 'Rodrigo',
            lastName: 'Zamora',
            email: 'rodrigo.zamora@hotmail.com',
            createdAt: Date.parse('2022-03-27T23:03:13.652+00:00'),
            updatedAt: Date.parse('2022-03-28T02:16:03.133+00:00')
        }
        for (let key in backupUser) {
            user[key] = backupUser[key];
        }
        let historyList = new List({
            name: 'Recently Watched',
            movieUUID: [],
            isShared: false,
            sharedWith: []
        });
        backupUser.list[0] = historyList;
        user.save();
    });
}

module.exports = {
    restore
};