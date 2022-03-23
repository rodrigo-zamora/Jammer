const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

describe('/', () => {
    it('Should return "Hello World!"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World!');
    });
});