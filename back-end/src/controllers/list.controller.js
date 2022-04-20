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
    getByName: function(userUUID, listName, res) {
        console.log(`Searching for list with name ${listName}`);
        return List.findOne({
            userUUID: userUUID,
            name: listName
        }).then(list => {
            if (!list) {
                console.log(`List with name ${listName} not found`);
                res.status(404).send('List not found');
            } else {
                console.log(`List with name ${listName} found`);
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
                if (listBody.listName) {
                    List.findOne({
                        userUUID: userUUID,
                        name: listBody.listName
                    }).then(list => {
                        if (list) {
                            console.log(`List with name ${listBody.listName} already exists`);
                            res.status(409).send('List already exists');
                        } else {
                            console.log(`List with name ${listBody.listName} not found`);
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
                } else {
                    console.log(`List name not provided`);
                    res.status(400).send('List name not provided');
                }
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
        List.findOne({
            listUUID: listUUID
        }).then(list => {
            if (list.name === 'Recently Watched') {
                console.log(`List with listUUID ${listUUID} can't be deleted`);
                res.status(400).send('List can\'t be deleted');
            }
        });
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