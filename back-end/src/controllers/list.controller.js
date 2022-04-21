const List = require('../models/List');
const User = require('../models/User');

const listController = {

    // TODO: Fix promise rejection
    getAll: function (userUUID) {
        console.log(`Searching for list with userUUID ${userUUID}`);
        return new Promise((resolve, reject) => {
            User.findOne({
                UUID: userUUID
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    if (user) {
                        List.find({
                            _id: {
                                $in: user.list
                            }
                        }, (err, lists) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(lists);
                            }
                        });
                    } else {
                        reject('User not found');
                    }
                }
            });
            reject('User not found');
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
    getByName: function (userUUID, listName, res) {
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
    create: function (userUUID, listBody) {
        console.log(`Creating list with userUUID ${userUUID} and listName ${listBody.listName}`);
        return new Promise((resolve, reject) => {
            User.findOne({
                UUID: userUUID
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    if (user) {
                        List.findOne({
                            name: listBody.listName
                        }, (err, list) => {
                            if (err) {
                                reject(err);
                            } else {
                                if (list) {
                                    reject('List with that name already exists');
                                } else {
                                    List.create(listBody, (err, list) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            user.list.push(list.UUID);
                                            user.save();
                                            resolve(list);
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        reject('User not found');
                    }
                }
            });
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