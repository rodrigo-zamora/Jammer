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
        match: /^[a-zA-Z0-9\s]+$/
    },
    movieUUID: [{
        type: String,
        required: false,
        default: []
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

let List = mongoose.model('List', listSquema);

module.exports = List;