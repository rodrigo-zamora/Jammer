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
    paymentType: {
        type: String,
        required: true,
        enum: ['creditCard', 'paypal']
    }
});

let Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;