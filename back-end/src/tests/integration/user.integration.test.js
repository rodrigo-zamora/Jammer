const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

// TODO: complete integration tests

describe('/users', () => {
    describe('GET', () => {
        it('should return all users', () => {
            request(app)
                .get('/users')
                .expect(200);
        });
    });
});

describe('/users/:uuid', () => {
    let userUUID = '77f38fc2-c53f-4637-9c57-d8529cc02bc1';
    describe('GET', () => {
            it('should return a user', (done) => {
                request(app)
                    .get('/users/' + userUUID)
                    .expect(200)
                    .end(endFunction(done));
            });
            it('should return a 404 if the user is not found', (done) => {
                request(app)
                    .get('/users/' + userUUID)
                    .expect(404)
                    .end(endFunction(done));
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