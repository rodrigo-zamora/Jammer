const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const movieSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
    },
    cuevanaUUID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true
    },
    sypnosis: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    cast: {
        type: [String],
        required: true
    }
}, { collection : 'movies' });

movieSchema.virtual('id').get(function () {
    return this._id;
});

movieSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
    }
});

let Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;