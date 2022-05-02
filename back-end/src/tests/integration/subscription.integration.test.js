const request = require('supertest');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const userUUID = "1f967358-d9b2-46d3-ae34-db9fd6d90c6e";
const subscriptionUUID = '431dfbab-dfea-4701-b669-c0e8700d4021';

describe('/subscription/:subscriptionUUID', () => {
    describe('DELETE', () => {
        it('should delete a subscription', (done) => {
            request(app)
                .delete(`/subscription/${subscriptionUUID}`)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the subscription does not exist', (done) => {
            request(app)
                .delete(`/subscription/-not-found`)
                .expect(404)
                .end(endFunction(done));
        });
    })
});

describe('/subscription/:userUUID', () => {
    describe('POST', () => {
        it('should create a new subscription', (done) => {
            request(app)
                .post(`/subscription/${userUUID}`)
                .send({
                    UUID: subscriptionUUID,
                    paymentType: 'credit',
                    subscriptionType: 'premium'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the user does not exist', (done) => {
            request(app)
                .post(`/subscription/${userUUID}-not-found`)
                .send({
                    UUID: subscriptionUUID,
                    paymentType: 'credit',
                    subscriptionType: 'premium'
                })
                .expect(404)
                .end(endFunction(done));
        });
    });
});

describe('/subscription/:subscriptionUUID', () => {
    describe('GET', () => {
        it('should return a subscription', (done) => {
            request(app)
                .get(`/subscription/${subscriptionUUID}`)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the subscription does not exist', (done) => {
            request(app)
                .get(`/subscription/-not-found`)
                .expect(404)
                .end(endFunction(done));
        });
    }),
    describe('PUT', () => {
        it('should update a subscription', (done) => {
            request(app)
                .put(`/subscription/${subscriptionUUID}`)
                .send({
                    subscriptionType: 'premium'
                })
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the subscription does not exist', (done) => {
            request(app)
                .put(`/subscription/-not-found`)
                .send({
                    subscriptionType: 'premium'
                })
                .expect(404)
                .end(endFunction(done));
        });
    });
});