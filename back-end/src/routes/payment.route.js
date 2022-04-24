const express = require('express');
const router = express.Router();

const { handleError } = require('../utils/hof');
const paymentController = require('../controllers/payment.controller');

router.get('/:paymentUUID', handleError(async (req, res) => {
    console.log(`Searching for payment with uuid ${req.params.paymentUUID}`);
    paymentController.get(req.params.paymentUUID, res);
}));

router.delete('/:paymentUUID', handleError(async (req, res) => {
    console.log(`Deleting payment with uuid ${req.params.paymentUUID}`);
    paymentController.delete(req.params.paymentUUID, res);
}));

router.put('/:paymentUUID', handleError(async (req, res) => {
    console.log(`Updating payment with uuid ${req.params.paymentUUID}`);
    paymentController.update(req.params.paymentUUID, req.body, res);
}));

router.get('/all/:userUUID', handleError(async (req, res) => {
    console.log(`Searching for user payments with uuid ${req.params.userUUID}`);
    paymentController.getUserPayments(req.params.userUUID, res);
}));

router.post('/:userUUID', handleError(async (req, res) => {
    console.log(`Creating payment for user with uuid ${req.params.userUUID}`);
    paymentController.create(req.params.userUUID, req.body, res);
}));
