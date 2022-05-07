const proxyquire = require('proxyquire').noCallThru();
const {saveJSON, getJSON, restore} = require('../../../utils/jsonHelpers');

let mockedData = getJSON();

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../../../utils/errors');

const subscriptionController = proxyquire('../../../controllers/subscription.controller', {
    '../models/Subscription': class Subscription {
        constructor(subscription) {
            this.UUID = subscription.UUID;
            this.paymentType = subscription.paymentType;
            this.subscriptionType = subscription.subscriptionType;
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static findOne(query) {
            return mockedData.subscriptions.find(subscription => subscription.UUID === query.UUID);
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
            mockedData.users.push(user);
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static findOne(query) {
            return mockedData.users.find(user => user.UUID === query.UUID || user.email === query.email);
        }
    }
});

afterAll(() => {
    restore();
});

describe('Subscription Controller', () => {
    describe('create', () => {
        it('should create a subscription', async () => {
            let subscription = {
                UUID: "subscription-UUID",
                paymentType: "debit",
                subscriptionType: "premium"
            }
            let createdSubscription = await subscriptionController.create('2f967358-d9b2-46d3-ae34-db9fd6d90c6e', subscription);
            expect(createdSubscription.UUID).toBe(subscription.UUID);
        }),
        it('should throw a NotFoundError if the user does not exist', async () => {
            let subscription = {
                UUID: "subscription-UUID",
                paymentType: "debit",
                subscriptionType: "premium"
            }
            try {
                await subscriptionController.create('2f967358-d9b2-46d3-ae34-db9fd6d90c6e', subscription);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a ConflictError if the user already has a subscription', async () => {
            let subscription = {
                UUID: "subscription-UUID",
                paymentType: "debit",
                subscriptionType: "premium"
            }
            try {
                await subscriptionController.create('1f967358-d9b2-46d3-ae34-db9fd6d90c6e', subscription);
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictError);
            }
        })
    }),
    describe('get', () => {
        it('should get a subscription', async () => {
            let subscription = await subscriptionController.get('SUB-1967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(subscription.UUID).toBe('SUB-1967358-d9b2-46d3-ae34-db9fd6d90c6e');
        }),
        it('should throw a NotFoundError if the subscription does not exist', async () => {
            try {
                await subscriptionController.get('subscription-UUID');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('update', () => {
        it('should update a subscription', async () => {
            let subscription = {
                paymentType: "credit"
            }
            let updatedSubscription = await subscriptionController.update('SUB-1967358-d9b2-46d3-ae34-db9fd6d90c6e', subscription);
            expect(updatedSubscription.UUID).toBe('SUB-1967358-d9b2-46d3-ae34-db9fd6d90c6e');
        }),
        it('should throw a NotFoundError if the subscription does not exist', async () => {
            let subscription = {
                paymentType: "credit"
            }
            try {
                await subscriptionController.update('subscription-UUID', subscription);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('delete', () => {
        it('should throw a NotFoundError if the subscription does not exist', async () => {
            try {
                await subscriptionController.delete('subscription-UUID');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    })
});