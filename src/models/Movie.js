const mongoose = require('mongoose');

const movieSquema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        index: true,
        unique: true,
        default: function() {
            return Utils.generateUUID();
        }
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
    synopsis: {
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
    director: {
        type: [String],
        required: true
    },
    cast: {
        type: [String],
        required: true
    }
});

let Movie = mongoose.model('Movie', movieSquema);

module.exports = Movie;