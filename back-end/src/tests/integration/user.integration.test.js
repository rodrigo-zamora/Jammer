const request = require('supertest');

const {
    restoreUser
} = require('../../utils/fileHelpers');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const userUUID = '77f38fc2-c53f-4637-9c57-d8529cc02bc1';

beforeAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
});

afterAll(() => {
    restoreUser();
})

describe('/users', () => {
    describe('GET', () => {
        it('should return all users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .end(endFunction(done));
        });
    }),
    describe('POST', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/users')
                .send({
                    firstName: 'Miriam',
                    lastName: 'Malta',
                    email: 'miriam.malta@hotmail.com',
                    password: '123456'  
                })
                .expect(201)
                .end(endFunction(done));
        }),
        it('should return 409 if the user already exists', (done) => {
            request(app)
                .post('/users')
                .send({
                    firstName: 'Miriam',
                    lastName: 'Malta',
                    email: 'miriam.malta@hotmail.com',
                    password: '123456'
                })
                .expect(409)
                .end(endFunction(done));
        })
    });
});

describe('/users/:uuid', () => {
    describe('GET', () => {
        it('should return a user', (done) => {
            request(app)
                .get('/users/' + userUUID)
                .expect(200)
                .end(endFunction(done));
        });
        it('should return 404 if the user is not found', (done) => {
            request(app)
                .get('/users/' + userUUID + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('PUT', () => {
        it('should update a user and return it', (done) => {
            request(app)
                .put('/users/' + userUUID)
                .send({
                    name: 'New name'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the user is not found', (done) => {
            request(app)
                .put('/users/' + userUUID + '-not-found')
                .send({
                    name: 'New name'
                })
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('DELETE', () => {
        it('should delete a user and return it', (done) => {
                request(app)
                    .delete('/users/' + userUUID)
                    .expect(200)
                    .end(endFunction(done));
        }),
        it('should return 404 if the user is not found', (done) => {
            request(app)
                .delete('/users/' + userUUID + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    });
});

describe('/users/:uuid/lists', () => {
    describe('GET', () => {
        it('should return all lists of a user', () => {
            request(app)
                .get('/users/' + userUUID + '/lists')
                .expect(200);
        }),
        it('should return 404 if the user is not found', () => {
            request(app)
                .get('/users/' + userUUID + '-not-found/lists')
                .expect(404);
        });
    });
});

describe('/users/:uuid/subscription', () => {
    describe('GET', () => {
        it('should return all subscriptions of a user', () => {
            request(app)
                .get('/users/' + userUUID + '/subscription')
                .expect(200);
        }),
        it('should return 404 if the user is not found', () => {
            request(app)
                .get('/users/' + userUUID + '-not-found/subscription')
                .expect(404);
        }),
        it('should return 404 if the user has no subscriptions', () => {
            request(app)
                .get('/users/' + userUUID + '/subscription')
                .expect(404);
        });
    });
});