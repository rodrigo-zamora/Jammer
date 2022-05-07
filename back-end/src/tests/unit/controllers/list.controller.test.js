const proxyquire = require('proxyquire').noCallThru();
const {
    saveJSON,
    getJSON,
    restore
} = require('../../../utils/jsonHelpers');

let mockedData = getJSON();

const {
    NotFoundError,
    ConflictError,
    BadRequestError,
    ForbiddenError,
    UnauthorizedError
} = require('../../../utils/errors');

const listController = proxyquire('../../../controllers/list.controller', {
    '../models/List': class List {
        constructor(list) {
            this.UUID = list.UUID;
            this.name = list.name;
            this.description = list.description;
            this.movies = list.movies;
            this.isShared = list.isShared;
            this.sharedWith = list.sharedWith;
            this.imageURL = list.imageURL;
            mockedData.lists.push(list);
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static find() {
            return mockedData.lists;
        }
        static findOne(query) {
            return mockedData.lists.find(list => list.UUID === query.UUID);
        }
        static deleteOne(UUID) {
            let toDelete = mockedData.lists.find(list => list.UUID === UUID);
            let index = mockedData.lists.indexOf(toDelete);
            mockedData.lists.splice(index, 1);
            return toDelete;
        }
    },
    '../models/User': class User {
        constructor(user) {
            this.UUID = user.UUID;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.password = user.password;
            this.lists = user.lists;
            this.sharedLists = user.sharedLists;
            this.subscription = user.subscription;
            this.createdAt = user.createdAt;
            this.updatedAt = user.updatedAt;
        }
        save() {
            saveJSON(mockedData);
        }
        static findOne(query) {
            return mockedData.users.find(user => user.UUID === query.UUID || user.email === query.email);
        }
    }
});

afterAll(() => {
    restore();
});

describe('List Controller', () => {
    describe('getAll', () => {
            it('should return all lists of a user', async () => {
                let expectedObject = {
                    lists: [],
                    sharedLists: []
                }
                let listsUUID = mockedData.users.find(user => user.UUID === '1f967358-d9b2-46d3-ae34-db9fd6d90c6e').lists;
                let expectedLists = mockedData.lists.filter(list => listsUUID.includes(list.UUID));
                expectedObject.lists.push(...expectedLists);
                let sharedListsUUID = mockedData.users.find(user => user.UUID === '1f967358-d9b2-46d3-ae34-db9fd6d90c6e').sharedLists;
                let expectedSharedLists = mockedData.lists.filter(list => sharedListsUUID.includes(list.UUID));
                expectedObject.sharedLists.push(...expectedSharedLists);
                let lists = await listController.getAll('1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                expect(lists).toEqual(expectedObject);
            })
        }),
        describe('get', () => {
            it('should return a list', async () => {
                    let expectedList = mockedData.lists.find(list => list.UUID === 'LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    let list = await listController.get('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    expect(list).toEqual(expectedList);
                }),
                it('should throw a NotFoundError if the list does not exist', async () => {
                    try {
                        await listController.get('notFound', '1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    } catch (error) {
                        expect(error).toBeInstanceOf(NotFoundError);
                    }
                }),
                it('should throw a ForbiddenError if no userUUID is provided', async () => {
                    try {
                        await listController.get('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    } catch (error) {
                        expect(error).toBeInstanceOf(ForbiddenError);
                    }
                }),
                it('should throw a NotFoundError if the userUUID provaded does not exist', async () => {
                    try {
                        await listController.get('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', 'notFound');
                    } catch (error) {
                        expect(error).toBeInstanceOf(NotFoundError);
                    }
                }),
                it('should throw a UnauthorizedError if the userUUID provided is not the owner of the list', async () => {
                    try {
                        await listController.get('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    } catch (error) {
                        expect(error).toBeInstanceOf(UnauthorizedError);
                    }
                }),
                it('should throw a UnauthorizedError if the list is not shared', async () => {
                    try {
                        await listController.get('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    } catch (error) {
                        expect(error).toBeInstanceOf(UnauthorizedError);
                    }
                })
        }),
        describe('create', () => {
            it('should create a list', async () => {
                    let list = {
                        UUID: 'testList',
                        name: 'list',
                        description: 'description',
                        movies: [],
                        isShared: false,
                        sharedWith: [],
                        imageURL: 'imageURL'
                    };
                    let createdList = await listController.create('1f967358-d9b2-46d3-ae34-db9fd6d90c6e', list);
                    expect(Object.assign({}, createdList)).toEqual(list);
                }),
                it('should throw a NotFoundError if the userUUID provided does not exist', async () => {
                    try {
                        await listController.create('notFound', {});
                    } catch (error) {
                        expect(error).toBeInstanceOf(NotFoundError);
                    }
                }),
                it('should throw a UnauthorizedError if the userUUID provided does not has a subscription', async () => {
                    try {
                        await listController.create('2f967358-d9b2-46d3-ae34-db9fd6d90c6e', {});
                    } catch (error) {
                        expect(error).toBeInstanceOf(UnauthorizedError);
                    }
                }),
                it('should throw a ConflictError if the list already exists', async () => {
                    try {
                        await listController.create('1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {
                            UUID: 'LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e',
                            name: 'list',
                            description: 'description',
                            movies: [],
                            isShared: false,
                            sharedWith: [],
                            imageURL: 'imageURL'
                        });
                    } catch (error) {
                        expect(error).toBeInstanceOf(ConflictError);
                    }
                }),
                it('should throw a BadRequestError if the list is not valid', async () => {
                    try {
                        await listController.create('1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {
                            UUID: 'LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e',
                            name: 'testList',
                            description: 'description',
                            movies: [],
                            isShared: false,
                            sharedWith: [],
                            imageURL: 'imageURL'
                        });
                    } catch (error) {
                        expect(error).toBeInstanceOf(BadRequestError);
                    }
                })
        }),
        describe('update', () => {
            it('should update a list', async () => {
                    let list = {
                        description: 'New description',
                    };
                    let updatedList = await listController.update('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', list);
                    let toUpdate = mockedData.lists.find(list => list.UUID === 'LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                    expect(Object.assign({}, updatedList)).toEqual(Object.assign({}, toUpdate, list));
                }),
                it('should throw a NotFoundError if the list does not exist', async () => {
                    try {
                        await listController.update('notFound', {});
                    } catch (error) {
                        expect(error).toBeInstanceOf(NotFoundError);
                    }
                }),
                it('should throw a BadRequestError if sharedWith is updated', async () => {
                    try {
                        await listController.update('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {
                            sharedWith: ['1f967358-d9b2-46d3-ae34-db9fd6d90c6e']
                        });
                    } catch (error) {
                        expect(error).toBeInstanceOf(BadRequestError);
                    }
                }),
                it('should throw a BadRequestError if the list is not valid', async () => {
                    try {
                        await listController.update('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {
                            title: 'list'
                        });
                    } catch (error) {
                        expect(error).toBeInstanceOf(BadRequestError);
                    }
                })
        }),
        describe('delete', () => {
            it('should throw a NotFoundError if the list does not exist', async () => {
                try {
                    await listController.delete('notFound');
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundError);
                }
            })
        })
    describe('addUserToList', () => {
        it('should throw a ConflictError if user is already in that list', async () => {
            try {
                let updatedList = await listController.addUserToList('SHARED-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
                let toUpdate = mockedData.lists.find(list => list.UUID === 'SHARED-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictError);
            }
        }),
        it('should throw a NotFoundError if the list does not exist', async () => {
            try {
                await listController.addUserToList('notFound', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a NotFoundError if the user does not exist', async () => {
            try {
                await listController.addUserToList('SHARED-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', 'notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a UnauthorizedError if the list is not shared', async () => {
            try {
                await listController.addUserToList('LIST-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedError);
            }
        })
    })
});