const mongoose = require('mongoose');

let Utils = require('../utils/utils');

const movieSchema = new mongoose.Schema({
    cuevanaID: {
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
        required: false
    },
    duration: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: false
    },
    cast: {
        type: [String],
        required: false
    }
}, { collection : 'movies' });

let Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;