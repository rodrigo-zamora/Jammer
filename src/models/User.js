const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const userSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: (props) => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    suscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suscription'
    }, 
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]
});

userSchema.pre('save', function(next) {
    let user = this;
    user.password = Utils.hashPassword(user.password);
    user.UUID = Utils.generateUUID();
    next();
});

let User = mongoose.model('User', userSchema);

module.exports = User;