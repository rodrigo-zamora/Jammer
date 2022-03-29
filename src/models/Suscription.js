const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const subscriptionSquema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    paymentUUID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    subscriptionType: {
        type: String,
        required: true,
        enum: ['free', 'premium']
    }
}, { collection : 'subscriptions' });

let subscription = mongoose.model('subscription', subscriptionSquema);

module.exports = subscription;