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

describe('/movies/:movieUUID', () => {
    describe('GET', () => {
        it('should return a movie', async () => {

        });
    }),
    describe('PUT', () => {
        it('should update a movie and return it', async () => {

        });
    }),
    describe('DELETE', () => {
        it('should delete a movie and return it', async () => {

        });
    });
});