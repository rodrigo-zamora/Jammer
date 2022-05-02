const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const tagUUID = "77t38ag2-c53f-4637-9c57-d8529cc02bc1";

describe('/tags', () => {
    describe('GET', () => {
        it('should return all tags', (done) => {
            request(app)
                .get('/tags')
                .expect(200)
                .end(endFunction(done));
        });
    });
    describe('POST', () => {
        it('should create a tag and return it', (done) => {
            request(app)
                .post('/tags')
                .send({
                    UUID: tagUUID,
                    name: 'New Tag'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 409 if the tag already exists', (done) => {
            request(app)
                .post('/tags')
                .send({
                    UUID: tagUUID,
                    name: 'New Tag'
                })
                .expect(409)
                .end(endFunction(done));
        })
    });
});

describe('/tags/:tagUUID', () => {
    describe('GET', () => {
        it('should return a tag', (done) => {
            request(app)
                .get('/tags/' + tagUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the tag does not exist', (done) => {
            request(app)
                .get('/tags/' + tagUUID + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('PUT', () => {
        it('should update a tag', (done) => {
            request(app)
                .put('/tags/' + tagUUID)
                .send({
                    name: 'Updated Tag'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the tag does not exist', (done) => {
            request(app)
                .put('/tags/-not-found')
                .send({
                    name: 'Updated Tag'
                })
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('DELETE', () => {
        it('should delete a tag', (done) => {
            request(app)
                .delete('/tags/' + tagUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the tag does not exist', (done) => {
            request(app)
                .delete('/tags/-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    });
});