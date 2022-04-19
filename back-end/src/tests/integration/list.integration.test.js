const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

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

        }),
        it('should return 404 if user does not exist', async () => {

        });
    }),
    describe('POST', () => {
        it('should create a list and return it', async () => {

        }),
        it('should return 404 if user does not exist', async () => {

        });
    });
});

describe('/lists/:userUUID/:listUUID', () => {
    describe('GET', () => {
        it('should return a list', async () => {

        }),
        it('should return 404 if user does not exist', async () => {

        }),
        it('should return 404 if list does not exist', async () => {
            
        });
    }),
    describe('PUT', () => {
        it('should update a list and return it', async () => {

        }),
        it('should return 404 if user does not exist', async () => {

        }),
        it('should return 404 if list does not exist', async () => {
            
        });
    }),
    describe('DELETE', () => {
        it('should delete a list and return it', async () => {

        }),
        it('should return 404 if user does not exist', async () => {

        }),
        it('should return 404 if list does not exist', async () => {
            
        });
    });
});