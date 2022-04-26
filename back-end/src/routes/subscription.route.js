const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const subscriptionController = require('../controllers/subscription.controller');

router.get('/:subscriptionUUID', handleError(async (req, res) => {
    console.log(`GET /subscriptions/${req.params.subscriptionUUID}`);
    let subscription = await subscriptionController.get(req.params.subscriptionUUID);
    res.send(subscription);
}));

router.put('/:subscriptionUUID', handleError(async (req, res) => {
    console.log(`PUT /subscriptions/${req.params.subscriptionUUID}`);
    let subscription = await subscriptionController.update(req.params.subscriptionUUID, req.body);
    res.send(subscription);
}));

router.post('/:userUUID', handleError(async (req, res) => {
    console.log(`POST /subscriptions/${req.params.userUUID}`);
    let subscription = await subscriptionController.create(req.params.userUUID, req.body);
    res.send(subscription);
}));


router.delete('/:subscriptionUUID', handleError(async (req, res) => {
    console.log(`DELETE /subscriptions/${req.params.subscriptionUUID}`);
    let subscription = await subscriptionController.delete(req.params.subscriptionUUID);
    res.send(subscription);
}));

module.exports = router;