const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

// TODO: complete integration tests

describe('/movies', () => {
    describe('GET', () => {
        it('should return all movies', async () => {

        });
    }),
    describe('POST', () => {
        it('should create a movie and return it', async () => {

        });
    });
});

describe('/movies/search', () => {
    describe('GET', () => {
        it('should return all the movies', async () => {

        });
    });
});

describe('/movies/movie/:movieUUID', () => {
    describe('GET', () => {
        it('should return a movie', async () => {

        }),
        it('should return 404 if movie does not exist', async () => {
                
        });
    }),
    describe('PUT', () => {
        it('should update a movie and return it', async () => {

        }),
        it('should return 404 if movie does not exist', async () => {
                
        });
    }),
    describe('DELETE', () => {
        it('should delete a movie and return it', async () => {

        }),
        it('should return 404 if movie does not exist', async () => {
                
        });
    });
});