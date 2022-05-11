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
    date: {
        type: Date,
        required: false,
        default: Date.now
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