const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const paymentSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    userUUID: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true,
        enum: ['creditCard', 'paypal']
    }
}, { collection : 'payments' });

paymentSchema.virtual('id').get(function () {
    return this._id;
});

paymentSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;