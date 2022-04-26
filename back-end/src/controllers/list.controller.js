const List = require('../models/List');
const User = require('../models/User');

const {
    NotFoundError,
    ConflictError,
    BadRequestError,
    UnauthorizedError
} = require('../utils/errors');

const listController = {
    getAll: async function (userUUID) {
        console.log(`Searching for list with userUUID ${userUUID}`);
        let user = await User.findOne({
            UUID: userUUID
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            let lists = await List.find({
                UUID: {
                    $in: user.lists
                }
            });
            return lists;
        }
    },
    get: async function (listUUID, userUUID) {
        console.log(`Searching for list with listUUID ${listUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            if (list.isShared) {
                if (list.sharedWith.includes(userUUID)) {
                    return list;
                } else {
                    throw new UnauthorizedError(`User with uuid ${userUUID} is not authorized to access this list`);
                }
            } else {
                throw new UnauthorizedError(`List with uuid ${listUUID} is private`);
            }
        }
    },
    create: async function (userUUID, listBody) {
        console.log(`Creating list with userUUID ${userUUID} and listName ${listBody.name}`);
        let user = await User.findOne({
            UUID: userUUID
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            let subscription = user.subscription;
            if (subscription == '') {
                throw new UnauthorizedError(`User with uuid ${userUUID} is not subscribed to any plan`);
            }

            let lists = await List.find({
                UUID: {
                    $in: user.lists
                }
            });

            for (let list of lists) {
                if (list.name === listBody.name) {
                    throw new ConflictError(`List with name ${listBody.name} already exists`);
                }
            }

            try {
                let newList = await new List(listBody);
                user.lists.push(newList.UUID);
                let savedUser = await user.save();
                await newList.save();
                return savedUser;

            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    update: async function (listUUID, listBody) {
        console.log(`Updating list with listUUID ${listUUID} and listName ${listBody.name}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            try {
                for (let key in listBody) {
                    if (listBody.hasOwnProperty(key)) {
                        list[key] = listBody[key];
                    }
                }
                let savedList = await list.save();
                return savedList;
            }
            catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    delete: async function (listUUID) {
        console.log(`Deleting list with listUUID ${listUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            try {
                let user = await User.findOne({
                    lists: listUUID
                });
                if (!user) {
                    throw new NotFoundError(`User with list ${listUUID} not found`);
                } else {
                    user.lists.splice(user.lists.indexOf(listUUID), 1);
                    await user.save();
                    await list.remove();
                    return list;
                }
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    }
};

module.exports = listController;