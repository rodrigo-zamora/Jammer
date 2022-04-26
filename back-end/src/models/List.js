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
        required: true
    },
    description: {
        type: String,
        required: false
    },
    movies: [{
        movieUUID: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        comments: [{
            commentUUID: {
                type: String,
                required: true
            },
            authorUUID: {
                type: String,
                required: true
            },
            tags: [{
                tagUUID: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                }
            }],
            text: {
                type: String,
                required: true
            },
            isPrivate: {
                type: Boolean,
                required: false,
                default: false
            },
            createdAt: {
                type: Date,
                required: true
            },
            updatedAt: {
                type: Date,
                required: true
            }
        }]
    }],
    isShared: {
        type: Boolean,
        required: true,
        default: false
    },
    sharedWith: [{
        type: String,
        required: true,
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