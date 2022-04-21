const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const listSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]+$/
    },
    movies: [{
        movieUUID: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            required: false,
            default: null
        }
    }],
    isShared: {
        type: Boolean,
        required: false,
        default: false
    },
    sharedWith: [{
        type: String,
        required: false,
        default: []
    }],
    imageURL: {
        type: String,
        required: false,
        default: ''
    }
}, { collection : 'lists' });

listSchema.virtual('id').get(function () {
    return this._id;
});

listSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let List = mongoose.model('List', listSchema);

module.exports = List;