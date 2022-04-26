const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

let Utils = require('../utils/utils');
let Passport = require('../config/passport');

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
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        validate: {
            validator: (firstName) => {
                return /^[a-zA-Z]+$/.test(firstName);
            },
            message: (props) => `${props.value} is not a valid first name!`
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        validate: {
            validator: (firstName) => {
                return /^[a-zA-Z]+$/.test(firstName);
            },
            message: (props) => `${props.value} is not a valid first name!`
        }
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
        minlength: 8,
        maxlength: 50,
        validate: {
            validator: (password) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(password);
            },
            message: (props) => `${props.value} is not a valid password!`
        },
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
        type: String,
        required: false,
        default: null
    },
    lists: [{
        type: String
    }],
    sharedLists: [{
        type: String
    }]
}, { collection: 'users' });

userSchema.virtual('id').get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

userSchema.pre('save', function (next) {
    // Update updatedAt with the current date
    this.updatedAt = Date.now();

    // Hash password if it was changed
    if (this.isModified('password')) {
        // Generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);
            
            // Hash the password using our new salt
            bcrypt.hash(this.password, salt, function (err, hash) {
                if (err) return next(err);

                // Override the cleartext password with the hashed one
                this.password = hash;
                next();
            });
        });
    }
    
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

userSchema.statics.deserialize = function (token, cb) {
    Passport.deserializeUser(token, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
}

let User = mongoose.model('User', userSchema);

module.exports = User;