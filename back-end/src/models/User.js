const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdUsingPassport: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
}, {
    collection: 'users'
});

userSchema.pre('save', function (next) {
    let user = this;

    // Update updatedAt with the current date
    user.updatedAt = Date.now();

    if (!user.isModified('password')) return next();

    if (!user.createdUsingPassport) {
        // Generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // Hash the password using the salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // Override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    }

    next();
});

let User = mongoose.model('User', userSchema);

module.exports = User;