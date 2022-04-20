const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

let Utils = require('../utils/utils');

const userSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function () {
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
        required: true,
        default: function () {
            // Generate a salt
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) return next(err);

                // Hash the password using our new salt
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);

                    // Override the cleartext password with the hashed one
                    user.password = hash;
                    next();
                });
            });
        }
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription'
    },
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]
}, {
    collection: 'users'
});

userSchema.pre('findOneAndUpdate', function (next) {
    // Update updatedAt with the current date
    this.updatedAt = Date.now();

    // TODO: Hash password if it was changed

    next();
});

userSchema.methods.hashPassword = function (password) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Hash the password using our new salt
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) return next(err);

            // Override the cleartext password with the hashed one
            this.password = hash;
            next();
        });
    });
};

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

let User = mongoose.model('User', userSchema);

module.exports = User;