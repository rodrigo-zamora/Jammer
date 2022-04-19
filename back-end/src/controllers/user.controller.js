const User = require('../models/User');

const userController = {
    getAllUsers: function (res) {
        console.log('Get all users');
        User.find({}, function (err, users) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    get: function (uuid, res) {
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
    create: function (user) {
        console.log('Creating user: ', user);
        try {
            User.findOne({
                email: user.email
            }).then(newUser => {
                if (newUser) {
                    console.log('User already exists');
                    return null;
                } else {
                    User.create(user).then(user => {
                        console.log('User created');
                        return user;
                    }).catch(err => {
                        console.log('Error creating user: ' + err.message);
                        return null;
                    });
                }
            })
        } catch (err) {
            console.log('Error creating user: ', err);
            return null;
        }
    },
    update: function (uuid, user) {
        console.log(`Updating user with uuid ${uuid}`);
        return User.findOne({
            UUID: uuid
        }).then(newUser => {
            if (!newUser) {
                console.log(`User with uuid ${uuid} not found`);
                return null;
            } else {
                console.log(`User with uuid ${uuid} found`);
                for (let key in user) {
                    if (user.hasOwnProperty(key)) {
                        newUser[key] = user[key];
                    }
                    if (key === 'password') {
                        newUser.hashPassword(user[key]);
                    }
                }
                newUser.save().then(user => {
                    console.log('User updated');
                    return user;
                }).catch(err => {
                    console.log('Error updating user: ' + err.message);
                    return null;
                });
            }
        });
    },
    delete: function (uuid) {
        console.log(`Deleting user with uuid ${uuid}`);
        return User.findOneAndDelete({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                return null;
            } else {
                console.log(`User with uuid ${uuid} deleted`);
                return user;
            }
        });
    },
    getLists: async function (uuid) {
        console.log(`Searching for lists for user with uuid ${uuid}`);
        return User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                return null;
            } else if (!user.lists) {
                console.log(`User with uuid ${uuid} has no lists`);
                return [];
            } else {
                console.log(`User with uuid ${uuid} has lists`);
                return user.lists;
            }
        });
    },
    getsubscription: async function (uuid) {
        console.log(`Searching for subscription for user with uuid ${uuid}`);
        return User.findOne({
            UUID: uuid
        }).then(user => {
            if (!user) {
                console.log(`User with uuid ${uuid} not found`);
                return null;
            } else if (!user.subscription) {
                console.log(`User with uuid ${uuid} has no subscription`);
                return [];
            } else {
                console.log(`subscription of user with uuid ${uuid} found`);
                return user.subscription;
            }
        });
    }
};

module.exports = userController;