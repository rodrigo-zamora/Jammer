const List = require('../models/List');
const User = require('../models/User');

const listController = {
    getAll: function (userUUID, res) {
        console.log(`Searching for list with userUUID ${userUUID}`);
        User.findOne({
            UUID: userUUID
        }).then(user => {
            if (!user) {
                console.log(`User with userUUID ${userUUID} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with userUUID ${userUUID} found`);
                List.find({
                    user: user._id
                }).then(lists => {
                    if (lists.length === 0) {
                        console.log(`User with userUUID ${userUUID} has no lists`);
                        res.status(404).send('User has no lists');
                    } else {
                        console.log(`User with userUUID ${userUUID} has ${lists.length} lists`);
                        res.status(200).send(lists);
                    }
                });
            }
        });
    },
    get: function (listUUID, res) {
        console.log(`Searching for list with listUUID ${listUUID}`);
        List.findOne({
            UUID: listUUID
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
        console.log(`Creating list with userUUID ${userUUID} and listName ${listBody.name}`);
        User.findOne({
            UUID: userUUID
        }).then(user => {
            if (!user) {
                console.log(`User with userUUID ${userUUID} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with userUUID ${userUUID} found`);
                List.findOne({
                    name: listBody.name
                }).then(newList => {
                    if (newList) {
                        console.log('List already exists');
                        res.status(409).send('List already exists');
                    } else {
                        List.create(listBody).then(list => {
                            console.log('List created');
                            list.save();
                            user.lists.push(list.UUID);
                            user.save();
                            res.status(201).send(list);
                        }).catch(err => {
                            console.log('Error creating list: ' + err.message);
                            res.status(500).send(err.message);
                        });
                    }
                });
            }
        });
    },
    update: function (listUUID, listBody, res) {
        console.log(`Updating list with listUUID ${listUUID} and listName ${listBody.name}`);
        List.findOne({
            UUID: listUUID
        }).then(list => {
            if (!list) {
                console.log(`List with listUUID ${listUUID} not found`);
                res.status(404).send('List not found');
            } else {
                for (let key in listBody) {
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
        List.findOne({
            UUID: listUUID
        }).then(list => {
            if (!list) {
                console.log(`List with listUUID ${listUUID} not found`);
                res.status(404).send('List not found');
            } else {
                list.remove().then(list => {
                    console.log(`List with listUUID ${listUUID} deleted`);
                    res.status(200).send(list);
                });
            }
        });
    }
};

module.exports = listController;