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
        type: String
    },
    subscriptionType: {
        type: String,
        required: true,
        enum: ['free', 'premium']
    }
}, { collection : 'subscriptions' });

subscriptionSquema.virtual('id').get(function () {
    return this._id;
});

subscriptionSquema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let Subscription = mongoose.model('subscription', subscriptionSquema);

module.exports = Subscription;