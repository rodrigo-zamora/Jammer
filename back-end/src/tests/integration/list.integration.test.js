const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const userUUID = '1f967358-d9b2-46d3-ae34-db9fd6d90c6e';
const listUUID = '1f967358-list-46d3-ae34-db9fd6d90c6e';

describe('/lists/:userUUID', () => {
    describe('GET', () => {
        it('should return all lists of the user', (done) => {
            request(app)
                .get('/lists/' + userUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the user does not exist', (done) => {
            request(app)
                .get('/lists/' + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('POST', () => {
        it('should create a new list', (done) => {
            request(app)
                .post('/lists/' + userUUID)
                .send({
                    UUID: listUUID,
                    name: 'Test List',
                    movies: [{
                            movieUUID: '1937a756-f392-4218-b9db-8c078c8bfbc0',
                            time: '1h'
                        }],
                    isShared: false,
                    sharedWith: []
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 409 if the list already exists', (done) => {
            request(app)
                .post('/lists/' + userUUID)
                .send({
                    name: 'Test List',
                    movies: [{
                            movieUUID: '1937a756-f392-4218-b9db-8c078c8bfbc0',
                            time: '1h'
                        }],
                    isShared: false,
                    sharedWith: []
                })
                .expect(409)
                .end(endFunction(done));
        }),
        it('should return 404 if the user does not exist', (done) => {
            request(app)
                .post('/lists/' + '-not-found')
                .send({
                    name: 'Test List',
                    movies: [{
                            movieUUID: '1937a756-f392-4218-b9db-8c078c8bfbc0',
                            time: '1h'
                        }],
                    isShared: false,
                    sharedWith: []
                })
                .expect(404)
                .end(endFunction(done));
        });
    });
});

describe('/lists/list/:listUUID', () => {
    describe('GET', () => {
        it('should return a list', (done) => {
            request(app)
                .get('/lists/list/' + listUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the list is not found', (done) => {
            request(app)
                .get('/lists/list/' + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('PUT', () => {
        it('should update a list', (done) => {
            request(app)
                .put('/lists/list/' + listUUID)
                .send({
                    isShared: true
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the list is not found', (done) => {
            request(app)
                .put('/lists/list/' + '-not-found')
                .send({
                    isShared: true
                })
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('DELETE', () => {
        it('should delete a list', (done) => {
            request(app)
                .delete('/lists/list/' + listUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the list is not found', (done) => {
            request(app)
                .delete('/lists/list/' + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    });
});