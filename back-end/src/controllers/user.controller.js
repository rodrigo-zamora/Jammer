const User = require('../models/User');

const userController = {
    getAllUsers: function () {
        console.log('Get all users');
        const users = User.find({});
        return users;
    },
    get: async function (uuid, res) {
        console.log(`Searching for user with uuid ${uuid}`);
        return User.findOne({
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
        return User.findOne({
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
    create: function (user, res) {
        console.log('Creating user: ', user);
        try {
            User.findOne({
                email: user.email
            }).then(newUser => {
                if (newUser) {
                    console.log('User already exists');
                    res.status(400).send('User already exists');
                } else {
                    User.create(user).then(user => {
                        console.log('User created');
                        res.status(201).send(user);
                    }).catch(err => {
                        console.log('Error creating user: ' + err.message);
                        res.status(400).send(err.message);
                    });
                }
            })
        } catch (err) {
            console.log('Error creating user: ', err);
            res.status(500).send('Error creating user');
        }
    },
    update: function (uuid, user, res) {
        console.log(`Updating user with uuid ${uuid}`);
        return User.findOneAndUpdate({
            UUID: uuid
        }, user, {
            new: true
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} updated`);
                user.save();
                res.status(200).send(user);
            }
        });
    },
    delete: function (uuid, res) {
        console.log(`Deleting user with uuid ${uuid}`);
        return User.findOneAndDelete({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else {
                console.log(`User with uuid ${uuid} deleted`);
                res.status(200).send(user);
            }
        });
    },
    getLists: async function (uuid, res) {
        console.log(`Searching for lists for user with uuid ${uuid}`);
        return User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else if (!user.lists) {
                console.log(`User with uuid ${uuid} has no lists`);
                res.status(200).send([]);
            } else {
                console.log(`User with uuid ${uuid} has lists`);
                res.status(200).send(user.lists);
            }
        });
    },
    getsubscription: async function (uuid, res) {
        console.log(`Searching for subscription for user with uuid ${uuid}`);
        return User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                res.status(404).send('User not found');
            } else if (!user.subscription) {
                console.log(`User with uuid ${uuid} has no subscription`);
                res.status(404).send('User has no subscription');
            } else {
                console.log(`subscription of user with uuid ${uuid} found`);
                res.status(200).send(user.subscription);
            }
        });
    }
};

module.exports = userController;