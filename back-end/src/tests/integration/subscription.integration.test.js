const request = require('supertest');

const {
    restoreSubscription
} = require('../../utils/fileHelpers');

const app = require('../../app');
const endFunction = require('./helpers/supertest-jasmine');

const userUUID = '77f38fc2-c53f-4637-9c57-d8529cc02bc1';
const subscriptionUUID = '77s38ub2-s53c-4637-9r57-i8529pt02ion';

describe('/subscription/:userUUID', () => {
    describe('POST', () => {
        it('should create a new subscription', (done) => {
            request(app)
                .post(`/subscription/${userUUID}`)
                .send({
                    UUID: subscriptionUUID + 'new',
                    paymentUUID: '77p38ay2-m53e-4637-9n57-t8529pt02ion',
                    subscriptionType: 'premium'
                })
                .expect(201)
                .end(endFunction(done));
        }),
        it('should return 404 if the user does not exist', (done) => {
            request(app)
                .post(`/subscription/not-found`)
                .send({
                    UUID: subscriptionUUID + 'new',
                    paymentUUID: '77p38ay2-m53e-4637-9n57-t8529pt02ion',
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
                .get(`/subscription/not-a-uuid`)
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
                .put(`/subscription/not-a-uuid`)
                .send({
                    subscriptionType: 'premium'
                })
                .expect(404)
                .end(endFunction(done));
        });
    });
});

describe('/subscription/:subscriptionUUID/:userUUID', () => {
    describe('DELETE', () => {
        it('should delete a subscription', (done) => {
            request(app)
                .delete(`/subscription/${subscriptionUUID}new/${userUUID}`)
                .expect(200)
                .end(endFunction(done));
        }),
        it('should return 404 if the subscription does not exist', (done) => {
            request(app)
                .delete(`/subscription/not-a-uuid/not-a-uuid`)
                .expect(404)
                .end(endFunction(done));
        });
    })
});