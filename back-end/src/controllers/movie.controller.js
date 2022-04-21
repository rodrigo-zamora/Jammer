const Movie = require('../models/Movie');
const Cuevana3 = require('../utils/cuevana3');

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
                for (let key in movie) {
                    if (movie.hasOwnProperty(key)) {
                        newMovie[key] = movie[key];
                    }
                }
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
        console.log('Searching for movies: ', query);
        let moviesFound = [];

        for (key in query) {
            if (query.hasOwnProperty(key)) {
                if (key === 'query' || key === 'title') {
                    console.log('Searching for movies using query: ', query[key]);
                    Cuevana3.getSearch(query[key], 1).then(movies => {
                        moviesFound = moviesFound.concat(movies);
                    });
                } else {
                    if (key === 'genre') {
                        console.log('Searching for movies with genre: ', query[key]);
                    }
                    if (key === 'actor') {
                        console.log('Searching for movies with actor: ', query[key]);
                    }
                }
            }
        }

        setTimeout(() => {
            console.log('Checking for movies in database');
            for (let movie in moviesFound) {
                let modifiedMovie = {
                    cuevanaUUID: moviesFound[movie].id,
                    title: moviesFound[movie].title,
                    poster: moviesFound[movie].poster,
                    year: moviesFound[movie].year,
                    sypnosis: moviesFound[movie].sypnosis,
                    rating: moviesFound[movie].rating,
                    duration: moviesFound[movie].duration,
                    genres: moviesFound[movie].genres,
                    director: moviesFound[movie].director,
                    cast: moviesFound[movie].cast
                }
                moviesFound[movie] = modifiedMovie;
                Movie.findOne({
                    cuevanaUUID: moviesFound[movie].cuevanaUUID
                }).then(newMovie => {
                    if (!newMovie) {
                        console.log('Movie with UUID ' + moviesFound[movie].cuevanaUUID + ' not found. Adding to database');
                        Movie.create(moviesFound[movie]).then(movie => {}).catch(err => {
                            console.log('Error adding movie to database: ' + err.message);
                        });
                    } else {
                        console.log('Movie with UUID ' + moviesFound[movie].cuevanaUUID + ' found');
                    }
                });
            }

            res.status(200).send(moviesFound);
        }, 1000);
    },
    getDetails: function (cuevanaUUID, res) {
        console.log('Searching for details of movie with cuevanaUUID: ', cuevanaUUID);
        Cuevana3.getDetail(cuevanaUUID).then(movie => {
            if (!movie) {
                console.log('Movie with cuevanaUUID ' + cuevanaUUID + ' not found');
                res.status(404).send('Movie not found');
            } else {
                console.log('Movie with cuevanaUUID ' + cuevanaUUID + ' found');
                res.status(200).send(movie);
            }
        });
    }
};

module.exports = movieController;