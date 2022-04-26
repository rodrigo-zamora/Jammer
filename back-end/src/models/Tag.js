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
        required: true
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
