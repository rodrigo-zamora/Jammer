const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
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
    count: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection : 'tags' });

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;