const List = require('../models/List');
const User = require('../models/User');

const {
    NotFoundError,
    ConflictError,
    BadRequestError,
    ForbiddenError,
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
            let toReturn = {
                lists: [],
                sharedLists: []
            }
            for (let list of user.lists) {
                let listToAdd = await List.findOne({
                    UUID: list
                });
                toReturn.lists.push(listToAdd);
            }
            for (let list of user.sharedLists) {
                let listToAdd = await List.findOne({
                    UUID: list
                });
                toReturn.sharedLists.push(listToAdd);
            }
            return toReturn;
        }
    },
    get: async function (listUUID, userUUID) {
        console.log(`Searching for list with listUUID ${listUUID}`);
        if (!userUUID) {
            throw new ForbiddenError('User not logged in');
        } else {
            let user = await User.findOne({
                UUID: userUUID
            });
            if (!user) {
                throw new NotFoundError(`User with uuid ${userUUID} not found`);
            } else {
                let list = await List.findOne({
                    UUID: listUUID
                });
                if (!list) {
                    throw new NotFoundError(`List with uuid ${listUUID} not found`);
                } else {
                    if (user.lists.includes(listUUID)) {
                        return list;
                    } else {
                        if (!list.isShared) {
                            throw new UnauthorizedError('List is not shared');
                        } else {
                            if (user.sharedLists.includes(listUUID)) {
                                return list;
                            } else {
                                throw new UnauthorizedError('User not allowed to access this list');
                            }
                        }
                    }
                }
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
            user = new User(user);
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
                await user.save();
                await newList.save();
                return newList;

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
            list = new List(list);
            try {
                for (let key in listBody) {
                    if (listBody.hasOwnProperty(key)) {
                        if (key == 'sharedWith') {
                            throw new BadRequestError('You cannot update sharedWith field using this method');
                        } else {
                            list[key] = listBody[key];
                        }
                    }
                }
                let savedList = await list.save();
                return savedList;
            } catch (err) {
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
                    lists: {
                        $in: listUUID
                    }
                });
                if (!user) {
                    throw new NotFoundError(`User with list ${listUUID} not found`);
                } else {
                    let sharedUsers = await User.find({
                        sharedLists: {
                            $in: listUUID
                        }
                    });
                    if (sharedUsers.length > 0) {
                        for (let userList of sharedUsers) {
                            userList.sharedLists.splice(userList.sharedLists.indexOf(listUUID), 1);
                            userList = new User(userList);
                            await userList.save();
                        }
                    }
                    user = new User(user);
                    list = new List(list);
                    user.lists.splice(user.lists.indexOf(listUUID), 1);
                    await user.save();
                    await list.remove();
                    return list;
                }
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    addUserToList: async function (listUUID, userUUID) {
        console.log(`Adding user with userUUID ${userUUID} to list with listUUID ${listUUID}`);
        let toAdd = await User.findOne({
            UUID: userUUID
        });
        if (!toAdd) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            if (toAdd.lists.includes(listUUID)) {
                throw new ConflictError(`User with uuid ${userUUID} is already in list with uuid ${listUUID}`);
            } else {
                let list = await List.findOne({
                    UUID: listUUID
                });
                if (!list) {
                    throw new NotFoundError(`List with uuid ${listUUID} not found`);
                } else {
                    if (!list.isShared) {
                        throw new UnauthorizedError(`List with uuid ${listUUID} is not shared`);
                    } else {
                        list.sharedWith.push(userUUID);
                        await list.save();
                        toAdd.sharedLists.push(listUUID);
                        await toAdd.save();
                        return list;
                    }
                }
            }
        }
    },
    removeUserFromList: async function (listUUID, userUUID) {
        console.log(`Removing user with userUUID ${userUUID} from list with listUUID ${listUUID}`);
        let toRemove = await User.findOne({
            UUID: userUUID
        });
        if (!toRemove) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            if (!toRemove.sharedLists.includes(listUUID)) {
                throw new NotFoundError(`User with uuid ${userUUID} is not in list with uuid ${listUUID}`);
            } else {
                let list = await List.findOne({
                    UUID: listUUID
                });
                if (!list) {
                    throw new NotFoundError(`List with uuid ${listUUID} not found`);
                } else {
                    if (!list.isShared) {
                        throw new UnauthorizedError(`List with uuid ${listUUID} is not shared`);
                    } else {
                        list.sharedWith.splice(list.sharedWith.indexOf(userUUID), 1);
                        await list.save();
                        toRemove.sharedLists.splice(toRemove.sharedLists.indexOf(listUUID), 1);
                        await toRemove.save();
                        return list;
                    }
                }
            }
        }
    },
    uploadImage: async function (listUUID, image) {
        console.log(`Uploading image to list with listUUID ${listUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            list = new List(list);
            try {
                list.imageURL = image;
                let savedList = await list.save();
                return savedList;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    getImage: async function (listUUID) {
        console.log(`Getting image from list with listUUID ${listUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        }
        return list.imageURL;
    }
};

module.exports = listController;