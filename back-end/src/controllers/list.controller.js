const List = require('../models/List');
const User = require('../models/User');

const listController = {
    getAll: function (userUUID, res) {
        console.log(`Searching for list with userUUID ${userUUID}`);
        return List.find({
            userUUID: userUUID
        }).then(list => {
            if (!list) {
                console.log(`List with userUUID ${userUUID} not found`);
                res.status(404).send('List not found');
            } else {
                console.log(`List with userUUID ${userUUID} found`);
                res.status(200).send(list);
            }
        });
    },
    get: function (listUUID, res) {
        console.log(`Searching for list with listUUID ${listUUID}`);
        return List.findOne({
            listUUID: listUUID
        }).then(list => {
            if (!list) {
                console.log(`List with listUUID ${listUUID} not found`);
                res.status(404).send('List not found');
            } else {
                console.log(`List with listUUID ${listUUID} found`);
                res.status(200).send(list);
            }
        });
    },
    create: function (userUUID, listBody, res) {
        console.log(`Creating list with userUUID ${userUUID} and listName ${listBody.listName}`);
        User.findOne({
            userUUID: userUUID
        }).then(user => {
            if (!user) {
                console.log(`User with userUUID ${userUUID} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with userUUID ${userUUID} found`);
                let list = new List({
                    name: listBody.name,
                    movieUUID: listBody.movieUUID,
                    isShared: false,
                    sharedWith: []
                });
                user.list.push(list);
                user.save();
                list.save();
                console.log(user);
                res.status(200).send(list);
            }
        });
    },
    update: function (listUUID, listBody, res) {
        console.log(`Updating list with listUUID ${listUUID} and listName ${listBody.name}`);
        return List.findOne({
            UUID: listUUID
        }).then(list => {
            if (!list) {
                console.log(`List with listUUID ${listUUID} not found`);
                res.status(404).send('List not found');
            } else {
                for(let key in listBody) {
                    list[key] = listBody[key];
                }
                list.save().then(list => {
                    console.log(`List with listUUID ${listUUID} updated`);
                    res.status(200).send(list);
                });
            }
        });
    },
    delete: function (listUUID, res) {
        console.log(`Deleting list with listUUID ${listUUID}`);
        return List.findOneAndDelete({
            listUUID: listUUID
        }).then(list => {
            if (!list) {
                console.log(`List with listUUID ${listUUID} not found`);
                res.status(404).send('List not found');
            } else {
                console.log(`List with listUUID ${listUUID} found`);
                res.status(200).send(list);
            }
        });
    }
};

module.exports = listController;