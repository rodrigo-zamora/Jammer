const List = require('../models/List');
const Movie = require('../models/Movie');
const User = require('../models/User');

const MovieController = require('./movie.controller');

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
        console.log(`Updating list with listUUID ${listUUID} and listBody ${listBody}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            console.log(`List found`);
            list = new List(list);
            for (let key in listBody) {
                console.log(`Setting ${key} to ${listBody[key]}`);
                if (key == 'movies') {
                    console.log(`Updating movies for list ${list.name}`);
                    console.log('Movies to add: ' + listBody.movies);
                    for (let movie of listBody.movies) {
                        console.log(`Updating movie ${movie}`);
                        console.log('Checking if movie exists in own database');
                        let movieInDatabase = await Movie.findOne({
                            $or: [{
                                UUID: movie
                            }, {
                                cuevanaUUID: movie
                            }]
                        });
                        if (!movieInDatabase) {
                            console.log('Movie does not exist in database');
                            console.log('Creating movie in database: ' + movie);
                            let toCreate = await MovieController.createFromCuevanaUUID(movie);
                            console.log('Movie created: ' + toCreate.title);
                            if (list.movies.includes(toCreate.UUID)) {
                                console.log('Movie already exists in list');
                            } else {
                                console.log('Movie does not exist in list');
                                list.movies.push(toCreate.UUID);
                            }
                            await toCreate.save();
                        } else {
                            console.log('Movie exists in database');
                            movieInDatabase = new Movie(movieInDatabase);
                            if (list.movies.includes(movieInDatabase.UUID)) {
                                console.log('Movie already exists in list');
                            } else {
                                console.log('Movie does not exist in list');
                                list.movies.push(movieInDatabase.UUID);
                            }
                            await movieInDatabase.save();
                        }
                    }
                } else {
                    list[key] = listBody[key];
                }

            }
            await list.save();
            return list;
        }
    },
    addMovie: async function (listUUID, movieUUID) {
        console.log(`Adding movie with listUUID ${listUUID} and movieUUID ${movieUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            list = new List(list);
            console.log(`List found`);
            let movieInDatabase = await Movie.findOne({
                $or: [{
                    UUID: movieUUID
                }, {
                    cuevanaUUID: movieUUID
                }]
            });
            if (!movieInDatabase) {
                console.log('Movie does not exist in database');
                console.log('Creating movie in database: ' + movieUUID);    
                let toCreate = await MovieController.createFromCuevanaUUID(movieUUID);
                console.log('Movie created: ' + toCreate.title);
                if (list.movies.includes(toCreate.UUID)) {
                    console.log('Movie already exists in list');
                } else {
                    console.log('Movie does not exist in list');
                    list.movies.push(toCreate.UUID);
                }
                await toCreate.save();
            } else {
                console.log('Movie exists in database');
                movieInDatabase = new Movie(movieInDatabase);
                if (list.movies.includes(movieInDatabase.UUID)) {
                    console.log('Movie already exists in list');
                } else {
                    console.log('Movie does not exist in list');
                    list.movies.push(movieInDatabase.UUID);
                }
                await movieInDatabase.save();
            }
            await list.save();
            return list;
        }
    },
    deleteMovie: async function (listUUID, movieUUID) {
        console.log(`Deleting movie with listUUID ${listUUID} and movieUUID ${movieUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            list = new List(list);
            let movie = await Movie.findOne({
                UUID: movieUUID
            });
            if (!movie) {
                throw new NotFoundError(`Movie with uuid ${movieUUID} not found`);
            } else {
                movie = new Movie(movie);
                if (list.movies.includes(movie.UUID)) {
                    list.movies.splice(list.movies.indexOf(movie.UUID), 1);
                } else {
                    throw new NotFoundError(`Movie with uuid ${movieUUID} not found in list ${list.name}`);
                }
                await list.save();
                return list;
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
            if (list.name == 'Historial') {
                throw new BadRequestError('You cannot delete this list');
            }
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
    addImage: async function (listUUID, image) {
        console.log(`Adding image to list with listUUID ${listUUID}`);
        let list = await List.findOne({
            UUID: listUUID
        });
        if (!list) {
            throw new NotFoundError(`List with uuid ${listUUID} not found`);
        } else {
            list = new List(list);
            if (!image) {
                throw new BadRequestError('No image provided');
            } else {
                list.imageURL = image.path;
                await list.save();
                return list;
            }
        }
    }
};

module.exports = listController;