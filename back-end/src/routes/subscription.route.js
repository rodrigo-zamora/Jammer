const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const subscriptionController = require('../controllers/subscription.controller');

router.get('/:subscriptionUUID', handleError(async (req, res) => {
    console.log(`GET /subscriptions/${req.params.subscriptionUUID}`);
    subscriptionController.getSubscription(req.params.subscriptionUUID, res);
}));

router.put('/:subscriptionUUID', handleError(async (req, res) => {
    console.log(`PUT /subscriptions/${req.params.subscriptionUUID}`);
    subscriptionController.updateSubscription(req.params.subscriptionUUID, req.body, res);
}));

router.post('/:userUUID', handleError(async (req, res) => {
    console.log(`POST /subscriptions/${req.params.userUUID}`);
    subscriptionController.createSubscription(req.params.userUUID, req.body, res);
}));


router.delete('/:subscriptionUUID/:userUUID', handleError(async (req, res) => {
    console.log(`DELETE /subscriptions/${req.params.subscriptionUUID}`);
    subscriptionController.deleteSubscription(req.params.subscriptionUUID, req.params.userUUID, res);
}));

module.exports = router;