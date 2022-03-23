const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const suscriptionSquema = new mongoose.Schema({
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
    suscriptionType: {
        type: String,
        required: true,
        enum: ['free', 'premium']
    }
});

let Suscription = mongoose.model('Suscription', suscriptionSquema);

module.exports = Suscription;