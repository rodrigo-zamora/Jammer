const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 500
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    sharedWith: [{
        userID: {
            type: Schema.Types.ObjectID,
            ref:'User',
            required: false
        }
    }],
    movies: [{
        movieID: {
            type: Schema.Types.ObjectID,
            ref: 'Movie',
            required: false
        }
    }]
}, { collection : 'lists' });

listSchema.pre('save', function (next) {
    let list = this;

    list.updatedAt = Date.now();

    next();
});

let List = mongoose.model('List', listSchema);

module.exports = List;