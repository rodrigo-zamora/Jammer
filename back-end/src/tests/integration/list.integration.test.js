const request = require('supertest');

const {
    restoreList
} = require('../../utils/fileHelpers');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const userUUID = '77f38fc2-c53f-4637-9c57-d8529cc02bc1';
const listUUID = '77l38is2-t53s-4637-9c57-d8529cc02bc1';

beforeAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
});

afterAll(() => {
    restoreList();
})

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
                .get('/lists/' + 'not-a-uuid')
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
                    sharedWith: [],
                    imageURL: ''
                })
                .expect(201)
                .end(endFunction(done));
        }),
        it('should return 409 if the list already exists', (done) => {
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
                    sharedWith: [],
                    imageURL: ''
                })
                .expect(409)
                .end(endFunction(done));
        }),
        it('should return 404 if the user does not exist', (done) => {
            request(app)
                .post('/lists/' + 'not-a-uuid')
                .send({
                    UUID: listUUID,
                    name: 'Test List',
                    movies: [{
                            movieUUID: '1937a756-f392-4218-b9db-8c078c8bfbc0',
                            time: '1h'
                        }],
                    isShared: false,
                    sharedWith: [],
                    imageURL: ''
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
                .get('/lists/list/' + 'not-a-uuid')
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
                .put('/lists/list/' + 'not-a-uuid')
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
                .delete('/lists/list/' + 'not-a-uuid')
                .expect(404)
                .end(endFunction(done));
        });
    });
});