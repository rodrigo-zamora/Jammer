const User = require('../models/User');
const List = require('../models/List');
const Subscription = require('../models/Subscription');

const userController = {
    getAllUsers: function () {
        console.log('Get all users');
        return new Promise((resolve, reject) => {
            User.find({}, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        });
    },
    get: function (uuid) {
        console.log(`Searching for user with uuid ${uuid}`);
        return new Promise((resolve, reject) => {
            User.findOne({
                UUID: uuid
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },
    getByEmail: function (email) {
        console.log(`Searching for user with email ${email}`);
        return new Promise((resolve, reject) => {
            User.findOne({
                email: email
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    // TODO: Fix promise rejection
    create: function (user) {
        console.log('Creating user: ', user);
        return new Promise((resolve, reject) => {
            // Check if user with that email exists
            User.findOne({
                email: user.email
            }, (err, existingUser) => {
                if (err) {
                    reject(err);
                } else {
                    if (existingUser) {
                        reject('User with that email already exists');
                    } else {
                        // Create default Recently Watched list (aka history)
                        let list = new List({
                            name: 'Recently Watched',
                            movies: null,
                            isShared: false,
                            sharedWith: []
                        });
                        list.save();
                        // Create new user
                        User.create(user, (err, newUser) => {
                            if (err) {
                                reject(err);
                            } else {
                                newUser.list.push(list.UUID);
                                resolve(newUser);
                            }
                        });
                    }
                }
            });
        });
    },
    update: function (uuid, user) {
        console.log(`Updating user with uuid ${uuid}`);
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({
                UUID: uuid
            }, user, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },
    delete: function (uuid) {
        console.log(`Deleting user with uuid ${uuid}`);
        return new Promise((resolve, reject) => {
            
        });
    },
    getLists: async function (uuid) {
        console.log(`Searching for lists for user with uuid ${uuid}`);
        return new Promise((resolve, reject) => {
            User.findOne({
                UUID: uuid
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(List.find({
                        _id: {
                            $in: user.list
                        }
                    }));
                }
            });
        });
    },
    getSubscription: async function (uuid) {
        console.log(`Searching for subscription for user with uuid ${uuid}`);
        return new Promise((resolve, reject) => {
            User.findOne({
                UUID: uuid
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Subscription.find({
                        _id: {
                            $in: user.subscription
                        }
                    }));
                }
            });
        });
    }
};

module.exports = userController;