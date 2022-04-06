const request = require('supertest');

const {
    restore,
    getJSON
} = require('../../utils/fileHelpers');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

afterAll(() => {
    restore();
});

// TODO: complete integration tests

describe('/users', () => {
    describe('GET', () => {
        it('should return all users', async () => {

        });
    });
});

describe('/users/:uuid', () => {
    describe('GET', () => {
            it('should return a user', async () => {

            }),
            it('should return a 404 if the user is not found', async () => {

            });
        }),
        describe('PUT', () => {
            it('should update a user and return it', async () => {

            }),
            it('should return a 404 if the user is not found', async () => {
                    
            });
        }),
        describe('DELETE', () => {
            it('should delete a user and return it', async () => {

            }),
            it('should return a 404 if the user is not found', async () => {
                
            });
        });
});

describe('/users/:uuid/lists', () => {
    describe('GET', () => {
        it('should return all lists of a user', async () => {

        }),
        it('should return a 404 if the user is not found', async () => {
                
        }),
        it('should return a 404 if the user has no lists', async () => {
            
        });
    });
});

describe('/users/:uuid/subscription', () => {
    describe('GET', () => {
        it('should return all subscriptions of a user', async () => {

        }),
        it('should return a 404 if the user is not found', async () => {

        }),
        it('should return a 404 if the user has no subscriptions', async () => {

        });
    });
});
