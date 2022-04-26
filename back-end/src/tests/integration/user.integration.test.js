const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const userUUID = "77f38fc2-c53f-4637-9c57-d8529cc02bc1";
const userEmail = "test.user@notanemail.com"; 

/*describe('/users', () => {
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
                    UUID: userUUID,
                    firstName: "Test",
                    lastName: "User",
                    email: userEmail,
                    password: "notasecurepassword12345_A"
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 409 if the user already exists', (done) => {
            request(app)
                .post('/users')
                .send({
                    UUID: userUUID,
                    firstName: "Test",
                    lastName: "User",
                    email: userEmail,
                    password: "notasecurepassword12345_A"
                })
                .expect(409)
                .end(endFunction(done));
        })
    });
});

describe('/users/:email', () => {
    describe('GET', () => {
        it('should return a user by email', (done) => {
            request(app)
                .get(`/users/${userEmail}`)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the user does not exist', (done) => {
            request(app)
                .get(`/users/${userEmail}` + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
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
                    firstName: 'New name'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the user is not found', (done) => {
            request(app)
                .put('/users/' + userUUID + '-not-found')
                .send({
                    firstName: 'New name'
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
        });
    });
});*/