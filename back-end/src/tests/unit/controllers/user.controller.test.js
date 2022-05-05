const proxyquire = require('proxyquire').noCallThru();
const {saveJSON, getJSON, restore} = require('../../../utils/jsonHelpers');

let mockedData = getJSON();

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../../../utils/errors');

const userController = proxyquire('../../../controllers/user.controller', {
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
            mockedData.users.push(user);
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static find() {
            return mockedData.users;
        }
        static findOne(query) {
            return mockedData.users.find(user => user.UUID === query.UUID || user.email === query.email);
        }
        static deleteOne(UUID) {
            let toDelete = mockedData.users.find(user => user.UUID === UUID);
            let index = mockedData.users.indexOf(toDelete);
            mockedData.users.splice(index, 1);
            return toDelete;
        }
    },
    '../models/List': class List {
        constructor(list) {
            mockedData.lists.push(list);
        }
        save() {
            saveJSON(mockedData);
        }
        static deleteMany(UUID) {
            let toDelete = mockedData.lists.find(list => list.UUID === UUID);
            let index = mockedData.lists.indexOf(toDelete);
            mockedData.lists.splice(index, 1);
            return toDelete;
        }
    },
    '../models/Subscription': class Subscription {
        static findOne(UUID) {
            let subscription = mockedData.subscriptions.find(subscription => subscription.UUID === UUID);
            return subscription;
        }
        static deleteOne(UUID) {
            let toDelete = mockedData.subscriptions.find(subscription => subscription.UUID === UUID);
            let index = mockedData.subscriptions.indexOf(toDelete);
            mockedData.subscriptions.splice(index, 1);
            return toDelete;
        }
    }
});

afterAll(() => {
    restore();
});

describe('User Controller', () => {
    describe('getAllUsers', () => {
        it('should return all users', async () => {
            let expectedUsers = mockedData.users;
            let users = await userController.getAllUsers();
            expect(users).toEqual(expectedUsers);
        });
    }),
    describe('get', () => {
        it('should return a user', async () => {
            let expectedUser = mockedData.users.find(user => user.UUID === '1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let user = await userController.get('1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(user).toEqual(expectedUser);
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                await userController.get('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('getByEmail', () => {
        it('should return a user', async () => {
            let expectedUser = mockedData.users.find(user => user.email === 'john.doe@hotmail.com');
            let user = await userController.getByEmail('john.doe@hotmail.com');
            expect(user).toEqual(expectedUser);
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                await userController.getByEmail('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('create', () => {
        it('should create a new user', async () => {
            let user = {
                UUID: 'UUID-miriam.malta',
                firstName: 'Miriam',
                lastName: 'Malta',
                email: 'miriam.malta@hotmail.com',
                password: 'notAPassword!"#',
                lists: [],
                sharedLists: [],
                subscription: null,
                createdAt: "2022-04-25T19:19:02.334+00:00",
                updatedAt: "2022-05-03T01:34:33.999+00:00"
            };
            let createdUser = await userController.create(user);
            expect(Object.assign({}, createdUser)).toEqual(user);
        }),
        it('should throw a ConflictError if the user already exists', async () => {
            try {
                let user = {
                    UUID: 'UUID-miriam.malta',
                    firstName: 'Miriam',
                    lastName: 'Malta',
                    email: 'miriam.malta@hotmail.com',
                    password: 'notAPassword!"#',
                    createdAt: "2022-04-25T19:19:02.334+00:00",
                    updatedAt: "2022-05-03T01:34:33.999+00:00"
                };
                await userController.create(user);
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictError);
            }
        }),
        it('should throw a BadRequestError if the user is not valid', async () => {
            try {
                let user = {
                    UUID: 'testUUID',
                    firstName: 'Rodrigo'
                };
                await userController.create(user);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('update', () => {
        it('should update a user', async () => {
            let user = {
                "firstName": "Jack",
            }
            let updatedUser = await userController.update('1f967358-d9b2-46d3-ae34-db9fd6d90c6e', user);
            let toUpdate = mockedData.users.find(user => user.UUID === '1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(Object.assign({}, updatedUser)).toEqual(Object.assign({}, toUpdate, user));
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                let user = {
                    "password": "notAPassword!"
                };
                userController.update('notFound', user);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a BadRequestError if the user is not valid', async () => {
            try {
                let user = {
                    "password": "notAPassword!"
                };
                await userController.update('1f967358-d9b2-46d3-ae34-db9fd6d90c6e', user);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('delete', () => {
        it('should delete a user', async () => {
            let toDelete = mockedData.users.find(user => user.UUID === 'UUID-miriam.malta');
            let user = await userController.delete('UUID-miriam.malta');
            expect(user).toEqual(toDelete);
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                await userController.delete('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('getLists', () => {
        it('should return all lists', async () => {
            let expectedLists = mockedData.users.find(user => user.UUID === '1f967358-d9b2-46d3-ae34-db9fd6d90c6e').lists;
            let lists = await userController.getLists('1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(lists).toEqual(expectedLists);
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                await userController.getLists('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('getSubscription', () => {
        it('should return the user subscription', async () => {
            let expectedSubscriptionUUID = 'SUB-1967358-d9b2-46d3-ae34-db9fd6d90c6e';
            let subscription = await userController.getSubscription('1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(subscription).toEqual(expectedSubscriptionUUID);
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                await userController.getSubscription('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    })

});