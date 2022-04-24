const User = require('../models/User');
const List = require('../models/List');
const Subscription = require('../models/Subscription');

const userController = {
    getAllUsers: function (res) {
        console.log('Get all users');
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).send(users);
            }
        });
    },
    get: function (uuid, res) {
        console.log(`Searching for user with uuid ${uuid}`);
        User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} found`);
                res.status(200).send(user);
            }
        });
    },
    getByEmail: function (email, res) {
        console.log(`Searching for user with email ${email}`);
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                console.log(`User with email ${email} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with email ${email} found`);
                res.status(200).send(user);
            }
        });
    },

    create: async function (user, res) {
        console.log('Creating new user with email: ', user.email);
        User.findOne({
            email: user.email
        }).then(newUser => {
            if (newUser) {
                console.log('User already exists');
                res.status(409).send('User already exists');
            } else {
                User.create(user).then(user => {
                    console.log('User created');
                    res.status(201).send(user);
                }).catch(err => {
                    console.log('Error creating user: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    },
    update: function (uuid, user, res) {
        console.log(`Updating user with uuid ${uuid}`);
        User.findOne({
            UUID: uuid
        }).then(newUser => {
            if (!newUser) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} found`);
                for (let key in user) {
                    if (user.hasOwnProperty(key)) {
                        newUser[key] = user[key];
                    }
                }
                newUser.save().then(user => {
                    console.log('User updated');
                    res.status(200).send(user);
                }).catch(err => {
                    console.log('Error updating user: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    },
    delete: function (uuid, res) {
        console.log(`Deleting user with uuid ${uuid}`);
        User.findOne({
            UUID: uuid
        }).then(newUser => {
            if (!newUser) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} found`);
                newUser.remove().then(user => {
                    console.log('User deleted');
                    res.status(200).send(user);
                }).catch(err => {
                    console.log('Error deleting user: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    },
    getLists: function (uuid, res) {
        console.log(`Searching for lists of user with uuid ${uuid}`);
        User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} found`);
                List.find({
                    UUID: {
                        $in: user.lists
                    }
                }).then(lists => {
                    console.log('Lists found');
                    res.status(200).send(lists);
                }).catch(err => {
                    console.log('Error searching for lists: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    },
    getSubscription: function (uuid, res) {
        console.log(`Searching for subscription of user with uuid ${uuid}`);
        User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} found`);
                Subscription.findOne({
                    UUID: {
                        $in: user.subscription
                    }
                }).then(subscription => {
                    console.log('Subscription found');
                    res.status(200).send(subscription);
                }).catch(err => {
                    console.log('Error searching for subscription: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    }
};

module.exports = userController;