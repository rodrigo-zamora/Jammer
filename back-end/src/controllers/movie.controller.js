const Movie = require('../models/Movie');
const Cuevana3 = require('cuevana3');

const movieController = {
    getAllMovies: function () {
        console.log('Get all movies');
        const movies = Movie.find({});
        return movies;
    },
    get: async function (uuid, res) {
        console.log(`Searching for movie with uuid ${uuid}`);
        return Movie.findOne({
            UUID: uuid
        }).then(movie => {
            if (!movie) {
                console.log(`Movie with uuid ${uuid} not found`);
                res.status(404).send('Movie not found');
            } else {
                console.log(`Movie with uuid ${uuid} found`);
                res.status(200).send(movie);
            }
        });
    },
    create: function (movie, res) {
        console.log('Creating movie: ', movie);
        try {
            Movie.findOne({
                UUID: movie.UUID
            }).then(newMovie => {
                if (newMovie) {
                    console.log('Movie already exists');
                    res.status(400).send('Movie already exists');
                } else {
                    Movie.create(movie).then(movie => {
                        console.log('Movie created');
                        res.status(201).send(movie);
                    }).catch(err => {
                        console.log('Error creating movie: ' + err.message);
                        res.status(400).send(err.message);
                    });
                }
            })
        } catch (err) {
            console.log('Error creating movie: ', err);
            res.status(500).send('Error creating movie');
        }
    },
    update: function (uuid, movie, res) {
        console.log(`Searching for movie with uuid ${uuid}`);
        return Movie.findOne({
            UUID: uuid
        }).then(newMovie => {
            if (!newMovie) {
                console.log(`Movie with uuid ${uuid} not found`);
                res.status(404).send('Movie not found');
            } else {
                console.log(`Movie with uuid ${uuid} found`);
                newMovie.title = movie.title;
                newMovie.poster = movie.poster;
                newMovie.year = movie.year;
                newMovie.synopsis = movie.synopsis;
                newMovie.rating = movie.rating;
                newMovie.duration = movie.duration;
                newMovie.genres = movie.genres;
                newMovie.director = movie.director;
                newMovie.cast = movie.cast;
                newMovie.save().then(movie => {
                    console.log('Movie updated');
                    res.status(200).send(movie);
                }).catch(err => {
                    console.log('Error updating movie: ' + err.message);
                    res.status(400).send(err.message);
                });
            }
        });
    },
    delete: function (uuid, res) {
        console.log(`Deleting movie with uuid ${uuid}`);
        return Movie.findOneAndDelete({
            UUID: uuid
        }).then(movie => {
            if (!movie) {
                console.log(`Movie with uuid ${uuid} not found`);
                res.status(404).send('Movie not found');
            } else {
                console.log(`Movie with uuid ${uuid} deleted`);
                res.status(200).send(movie);
            }
        });
    },
    search: function (query, res) {
        console.log(`Searching for movie with query ${query}`);
        return Cuevana3.getSearch(query, 0).then(movies => {
            if (movies.length === 0) {
                console.log(`Movie with query ${query} not found`);
                res.status(404).send('Movie not found');
            } else {
                console.log(`Movie with query ${query} found`);
                res.status(200).send(movies);
            }
        });
    }
};

module.exports = movieController;