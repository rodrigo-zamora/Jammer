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
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 500,
        validate: {
            validator: (description) => {
                return /^[a-zA-Z ]+$/.test(name);
            }
        }
    },
    movies: [],
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