const User = require('../models/User');
const List = require('../models/List');
const Subscription = require('../models/Subscription');

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../utils/errors');

const userController = {
    getAllUsers: function () {
        console.log('Get all users');
        return User.find({});
    },
    get: async function (uuid) {
        console.log(`Searching for user with uuid ${uuid}`);
        let user = await User.findOne({
            UUID: uuid
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${uuid} not found`);
        } else {
            return user;
        }
    },
    getByEmail: async function (email) {
        console.log(`Searching for user with email ${email}`);
        let user = await User.findOne({
            email: email
        });
        if (!user) {
            throw new NotFoundError(`User with email ${email} not found`);
        } else {
            return user;
        }
    },

    create: async function (user) {
        console.log('Creating new user with email: ', user.email);
        let toCreate = await User.findOne({
            email: user.email
        });
        if (toCreate) {
            throw new ConflictError(`User with email ${user.email} already exists`);
        } else {
            let list = {
                name: 'Recently Watched',
                movies: [],
                isShared: false,
                sharedWith: []
            }
            try {
                let newUser = await new User(user);
                let recentlyWatchedList = await new List(list);
                newUser.lists.push(recentlyWatchedList.UUID);
                let savedUser = await newUser.save();
                await recentlyWatchedList.save();
                return savedUser;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    update: async function (uuid, user) {
        console.log(`Updating user with uuid ${uuid}`);
        let toUpdate = await User.findOne({
            UUID: uuid
        });
        if (!toUpdate) {
            throw new NotFoundError(`User with uuid ${uuid} not found`);
        } else {
            try {
                for (let key in user) {
                    if (user.hasOwnProperty(key)) {
                        toUpdate[key] = user[key];
                    }
                }
                let savedUser = await toUpdate.save();
                return savedUser;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    delete: async function (uuid) {
        console.log(`Deleting user with uuid ${uuid}`);
        let toDelete = await User.findOne({
            UUID: uuid
        });
        if (!toDelete) {
            throw new NotFoundError(`User with uuid ${uuid} not found`);
        } else {
            let deletedUser = await User.deleteOne({
                UUID: uuid
            });
            await List.deleteMany({
                UUID: {
                    $in: toDelete.lists
                }
            });
            await Subscription.deleteOne({
                UUID: toDelete.subscriptions
            });
            return toDelete;
        }
    },
    getLists: async function (uuid) {
        console.log(`Searching for lists of user with uuid ${uuid}`);
        let user = await User.findOne({
            UUID: uuid
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${uuid} not found`);
        } else {
            return user.lists;
        }
    },
    getSubscription: async function (uuid) {
        console.log(`Searching for subscription of user with uuid ${uuid}`);
        let user = await User.findOne({
            UUID: uuid
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${uuid} not found`);
        } else {
            return user.subscription;
        }
    }
};

module.exports = userController;