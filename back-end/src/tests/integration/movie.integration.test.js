const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const movieUUID = "77m38ov2-i53e-4637-9c57-d8529cc02bc1";

describe('/movies', () => {
    describe('GET', () => {
        it('should return all movies', (done) => {
            request(app)
                .get('/movies')
                .expect(200)
                .end(endFunction(done));
        });
    }),
    describe('POST', () => {
        it('should create a movie and return it', (done) => {
            request(app)
                .post('/movies')
                .send({
                    UUID: movieUUID,
                    cuevanaUUID: '55555/movie',
                    title: 'New Movie',
                    poster: '',
                    year: '2022',
                    sypnosis: 'A random movie',
                    rating: 2.5,
                    duration: '2h',
                    genres: ['Acción', 'Drama'],
                    cast: ['Actor 1', 'Actor 2']
                })
                .expect(200)
                .end(endFunction(done));
        });
    });
});

describe('/movies/search', () => {
    describe('GET', () => {
        it('should return all the movies with genre 1', (done) => {
            request(app)
                .get('/movies/search?genre=1')
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 400 if no query is given', (done) => {
            request(app)
                .get('/movies/search')
                .expect(400)
                .end(endFunction(done));
        });
    });
});

describe('/movies/movie/:movieUUID', () => {
    describe('GET', () => {
        it('should return a movie', (done) => {
            request(app)
                .get('/movies/movie/' + movieUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if movie does not exist', (done) => {
            request(app)
                .get('/movies/movie/' + movieUUID + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('PUT', () => {
        it('should update a movie and return it', (done) => {
            request(app)
                .put('/movies/movie/' + movieUUID)
                .send({
                    title: 'New title'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if movie does not exist', (done) => {
            request(app)
                .put('/movies/movie/' + movieUUID + '-not-found')
                .send({
                    title: 'New title v2'
                })
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('DELETE', () => {
        it('should delete a movie and return it', (done) => {
            request(app)
                .delete('/movies/movie/' + movieUUID)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if movie does not exist', (done) => {
            request(app)
                .delete('/movies/movie/' + movieUUID + '-not-found')
                .expect(404)
                .end(endFunction(done));
        });
    });
});