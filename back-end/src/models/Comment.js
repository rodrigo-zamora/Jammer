const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const commentSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    authorUUID: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    authorImage: {
        type: String,
        required: false
    },
    movieUUID: {
        type: String,
        required: true
    },
    tags: [{
        tagUUID: {
            type: String,
            required: true
        }
    }],
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 500,
        validate: {
            validator: (text) => {
                return /^[a-zA-Z0-9\s\.,\?\!\:\;\(\)\-\_\=\+\*\&\%\$\#\@\[\]\{\}]+$/.test(text);
            }
        }
    },
    isPrivate: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection : 'comments' });

commentSchema.virtual('id').get(function () {
    return this._id;
});

commentSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;