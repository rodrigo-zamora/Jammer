const Payment = require('../models/Payment');

const paymentController = {
    getUserPayments: function (userUUID, res) {
        console.log(`Searching for user payments with uuid ${userUUID}`);
        return Payment.find({
            userUUID: userUUID
        }).then(payments => {
            if (!payments) {
                console.log(`User payments with uuid ${userUUID} not found`);
                res.status(404).send('User payments not found');
            } else {
                console.log(`User payments with uuid ${userUUID} found`);
                res.status(200).send(payments);
            }
        });
    },
    get: async function (uuid, res) {
        console.log(`Searching for payment with uuid ${uuid}`);
        return Payment.findOne({
            UUID: uuid
        }).then(payment => {
            if (!payment) {
                console.log(`Payment with uuid ${uuid} not found`);
                res.status(404).send('Payment not found');
            } else {
                console.log(`Payment with uuid ${uuid} found`);
                res.status(200).send(payment);
            }
        });
    },
    create: function (payment, res) {
        console.log('Creating payment: ', payment);
        Payment.create(payment).then(payment => {
            console.log('Payment created');
            res.status(201).send(payment);
        }).catch(err => {
            console.log('Error creating payment: ' + err.message);
            res.status(400).send(err.message);
        });
    },
    update: function (uuid, payment, res) {
        console.log(`Searching for payment with uuid ${uuid}`);
        return Payment.findOne({
            UUID: uuid
        }).then(newPayment => {
            if (!newPayment) {
                console.log(`Payment with uuid ${uuid} not found`);
                res.status(404).send('Payment not found');
            } else {
                console.log(`Payment with uuid ${uuid} found`);
                for (let key in payment) {
                    if (payment.hasOwnProperty(key)) {
                        newPayment[key] = payment[key];
                    }
                }
                newPayment.save().then(payment => {
                    console.log('Payment updated');
                    res.status(200).send(payment);
                }).catch(err => {
                    console.log('Error updating payment: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    },
    delete: function (uuid, res) {
        console.log(`Searching for payment with uuid ${uuid}`);
        return Payment.findOne({
            UUID: uuid
        }).then(payment => {
            if (!payment) {
                console.log(`Payment with uuid ${uuid} not found`);
                res.status(404).send('Payment not found');
            } else {
                console.log(`Payment with uuid ${uuid} found`);
                payment.remove().then(() => {
                    console.log('Payment deleted');
                    res.status(200).send('Payment deleted');
                }).catch(err => {
                    console.log('Error deleting payment: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    }
}

module.exports = paymentController;