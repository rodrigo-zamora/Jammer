const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const subscriptionSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['free', 'premium']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection : 'subscriptions' });

let Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;