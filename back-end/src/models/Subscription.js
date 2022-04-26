const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const subscriptionSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    paymentType: {
        type: String,
        required: true,
        enum: ['credit', 'debit']
    },
    subscriptionType: {
        type: String,
        required: true,
        enum: ['premium']
    }
}, { collection : 'subscriptions' });

subscriptionSchema.virtual('id').get(function () {
    return this._id;
});

subscriptionSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;