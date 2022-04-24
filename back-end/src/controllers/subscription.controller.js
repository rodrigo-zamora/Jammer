const User = require('../models/User');
const Subscription = require('../models/Subscription');

const subscriptionController = {
    createSubscription: function (userUUID, subscription, res) {
        console.log('Creating new subscription');
        User.findOne({
            UUID: userUUID
        }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if (user) {
                    Subscription.create(subscription, function (err, subscription) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        } else {
                            user.subscription = subscription.UUID;
                            user.save(function (err) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                } else {
                                    res.status(201).send(subscription);
                                }
                            });
                        }
                    });
                } else {
                    res.status(404).send('User not found');
                }
            }
        });
    },
    getSubscription: function (uuid, res) {
        console.log(`Searching for subscription with uuid ${uuid}`);
        Subscription.findOne({
            UUID: uuid
        }).then(subscription => {
            if (!subscription) {
                console.log(`Subscription with uuid ${uuid} not found`);
                res.status(404).send('Subscription not found');
            } else {
                console.log(`Subscription with uuid ${uuid} found`);
                res.status(200).send(subscription);
            }
        }).catch(err => {
            console.log('Error searching for subscription: ' + err.message);
            res.status(400).send(err.message);
        });
    },
    deleteSubscription: function (uuid, userUUID, res) {
        console.log(`Searching for subscription with uuid ${uuid}`);
        Subscription.findOne({
            UUID: uuid
        }).then(subscription => {
            if (!subscription) {
                console.log(`Subscription with uuid ${uuid} not found`);
                res.status(404).send('Subscription not found');
            } else {
                console.log(`Subscription with uuid ${uuid} found`);
                User.findOne({
                    UUID: userUUID
                }).then(user => {
                    user.subscription = '';
                    console.log(`Deleting subscription with uuid ${uuid}`);
                    user.save();
                    Subscription.findOneAndRemove({
                        UUID: uuid
                    }).then(subscription => {
                        console.log('Subscription deleted');
                        res.status(200).send(subscription);
                    }).catch(err => {
                        console.log('Error deleting subscription: ' + err.message);
                        res.status(400).send(err.message);
                    });
                });
            }
        }).catch(err => {
            console.log('Error searching for subscription: ' + err.message);
            res.status(400).send(err.message);
        });
    },
    updateSubscription: function (uuid, subscription, res) {
        console.log(`Searching for subscription with uuid ${uuid}`);
        Subscription.findOne({
            UUID: uuid
        }).then(subscription => {
            if (!subscription) {
                console.log(`Subscription with uuid ${uuid} not found`);
                res.status(404).send('Subscription not found');
            } else {
                console.log(`Subscription with uuid ${uuid} found`);
                subscription.subscriptionType = subscription.subscriptionType;
                subscription.save().then(subscription => {
                    console.log('Subscription updated');
                    res.status(200).send(subscription);
                }).catch(err => {
                    console.log('Error updating subscription: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        }).catch(err => {
            console.log('Error searching for subscription: ' + err.message);
            res.status(400).send(err.message);
        });
    }
};

module.exports = subscriptionController;