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

describe('/subscription', () => {
    describe('GET', () => {
        it('should return the subscription of the user', async () => {

        });
    });
});

describe('/subscription/:userUUID', () => {
    describe('GET', () => {
        it('should return the subscription of the user', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    }),
    describe('POST', () => {
        it('should create a subscription and return it', async () => {
        
        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    }),
    describe('PUT', () => {
        it('should update a subscription and return it', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    }),
    describe('DELETE', () => {
        it('should delete a subscription and return it', async () => {

        }),
        it('should return 404 if the user does not exist', async () => {
                
        });
    });
});