const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const commentUUID = "1c967358-d9b2-46d3-ae34-db9fd6d90c6e";
const authorUUID = "1f967358-d9b2-46d3-ae34-db9fd6d90c6e";
const movieUUID = "adventures-of-a-mathematician";

describe('/comments/:movieUUID', () => {
    describe('GET', () => {
        it('should return all comments for a movie', (done) => {
            request(app)
                .get(`/comments/${movieUUID}`)
                .expect(200)
                .end(endFunction(done));
        })
    }),
    describe('POST', () => {
        it('should create a new comment', (done) => {
            request(app)
                .post(`/comments/${movieUUID}`)
                .send({
                    UUID: commentUUID,
                    authorUUID: authorUUID,
                    movieUUID: movieUUID,
                    text: 'This is a comment',
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the movie does not exist', (done) => {
            request(app)
                .post(`/comments/${movieUUID}-not-found`)
                .send({
                    UUID: commentUUID,
                    authorUUID: authorUUID,
                    movieUUID: movieUUID,
                    text: 'This is a comment'
                })
                .expect(404)
                .end(endFunction(done));
        });
    });
});

describe('/comments/:commentUUID/:userUUID', () => {
    describe('PUT', () => {
        it('should update a comment', (done) => {
            request(app)
                .put(`/comments/${commentUUID}/${authorUUID}`)
                .send({
                    text: 'This is a comment'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the comment does not exist', (done) => {
            request(app)
                .put(`/comments/${commentUUID}-not-found/${authorUUID}`)
                .send({
                    text: 'This is a comment'
                })
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('DELETE', () => {
        it('should delete a comment', (done) => {
            request(app)
                .delete(`/comments/${commentUUID}/${authorUUID}`)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the comment does not exist', (done) => {
            request(app)
                .delete(`/comments/${commentUUID}-not-found/${authorUUID}`)
                .expect(404)
                .end(endFunction(done));
        });
    });
});