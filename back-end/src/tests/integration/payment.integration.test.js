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

describe('/payment', () => {
    describe('GET', () => {
        it('should return all payments', async () => {

        });
    }),
    describe('POST', () => {
        it('should create a payment and return it', async () => {

        });
    });
});

describe('/payment/:userUUID', () => {
    describe('GET', () => {
        it('should return all payments of the user', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {

        });
    }),
    describe('POST', () => {
        it('should create a payment and return it', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    }),
    describe('PUT', () => {
        it('should update a payment and return it', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    }),
    describe('DELETE', () => {
        it('should delete a payment and return it', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    });
});