const mongooose = require('mongoose');

const paymentSchema = new mongooose.Schema({
    userID: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    subscriptionID: {
        type: Schema.Types.ObjectID,
        ref: 'Subscription',
        required: true
    },
    paymentType: {
        type: String,
        required: true,
        enum: ['creditCard', 'debitCard']
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection : 'payments' });

let Payment = mongooose.model('payment', paymentSchema);

module.exports = Payment;