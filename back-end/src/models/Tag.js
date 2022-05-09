const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const tagSchema = new mongoose.Schema({
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
        maxlength: 25,
        validate: {
            validator: (name) => {
                return /^[a-zA-Z0-9\s\.,\?\!\:\;\(\)\-\_\=\+\*\&\%\$\#\@\[\]\{\}]+$/.test(text);
            }
        }
    },
    count: {
        type: Number,
        required: false,
        default: 0
    }
}, { collection : 'tags' });

tagSchema.virtual('id').get(function () {
    return this._id;
});

tagSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
