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

describe('/lists', () => {
    describe('GET', () => {
        it('should return all lists of the user', async () => {

        });
    })
});

describe('/lists/:userUUID', () => {
    describe('GET', () => {
        it('should return all lists of the user', async () => {

        });
    }),
    describe('POST', () => {
        it('should create a list and return it', async () => {

        });
    });
});

describe('/lists/:userUUID/:listUUID', () => {
    describe('GET', () => {
        it('should return a list', async () => {

        });
    }),
    describe('PUT', () => {
        it('should update a list and return it', async () => {

        });
    }),
    describe('DELETE', () => {
        it('should delete a list and return it', async () => {

        });
    });
});