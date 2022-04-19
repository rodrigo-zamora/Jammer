const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const listSquema = new mongoose.Schema({
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
        default: 'New List'
    },
    movieUUID: [{
        type: String,
        ref: 'Movie'
    }],
    isShared: {
        type: Boolean,
        default: false
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { collection : 'lists' });

let List = mongoose.model('List', listSquema);

module.exports = List;