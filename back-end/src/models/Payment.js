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

let Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;