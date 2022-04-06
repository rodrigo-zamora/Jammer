const List = require('../models/List');

const listController = {
    getAll: function (userUUID, res) {
        console.log(`Searching for list with userUUID ${userUUID}`);
        return List.findOne({
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
    create: function (userUUID, listName, res) {
        console.log(`Creating list with userUUID ${userUUID} and listName ${listName}`);
        return List.create({
            userUUID: userUUID,
            listName: listName
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
    update: function (listUUID, listName, res) {
        console.log(`Updating list with listUUID ${listUUID} and listName ${listName}`);
        return List.findOne({
            listUUID: listUUID
        }).then(list => {
            if (!list) {
                console.log(`List with listUUID ${listUUID} not found`);
                res.status(404).send('List not found');
            } else {
                list.listName = listName;
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