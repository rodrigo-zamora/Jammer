const Movie = require('../models/Movie');
const Cuevana3 = require('../utils/cuevana3');

const movieController = {
    getAllMovies: function (res) {
        console.log('Get all movies');
        Movie.find({}, (err, movies) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).send(movies);
            }
        });
    },
    get: async function (uuid, res) {
        console.log(`Searching for movie with uuid ${uuid}`);
        Movie.findOne({
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
        console.log('Creating movie: ', movie.title);
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
                        res.status(500).send(err.message);
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
        Movie.findOne({
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
        Movie.findOneAndDelete({
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
    search: function (query, res) {;
        console.log('Searching for movies: ', query);
        if (Object.keys(query).length === 0) {
            res.status(400).send('Invalid query');
        } else {
            for (key in query) {
                if (query.hasOwnProperty(key)) {
                    if (key === 'title') {
                        console.log('Searching for movies using query: ', query[key]);
                        Cuevana3.getSearch(query[key], 1).then(movies => {
                            res.status(200).send(movies);
                        });
                    } else {
                        if (key === 'genre') {
                            console.log('Searching for movies with genre: ', query[key]);
                            let genres = {
                                0: "Acción",
                                1: "Animación",
                                2: "Aventura",
                                3: "Bélico guerra",
                                4: "Biografía",
                                5: "Ciencia ficción",
                                6: "Comedia",
                                7: "Crimen",
                                8: "Documentales",
                                9: "Drama",
                                10: "Familiar",
                                11: "Fantasía",
                                12: "Misterio",
                                13: "Musical",
                                14: "Romance",
                                15: "Terror",
                                16: "Thriller"
                            };
                            let genre = genres[query[key]];
                            Movie.find({
                                genres: {
                                    $in: [genre]
                                }
                            }).then(movies => {
                                res.status(200).send(movies);
                            });
                        }
                        else if (key === 'actor') {
                            console.log('Searching for movies with actor: ', query[key]);
                            Movie.find({
                                actors: {
                                    $in: [query[key]]
                                }
                            }).then(movies => {
                                res.status(200).send(movies);
                            });
                        } else {
                            res.status(400).send('Invalid query');
                        }
                    }
                }
            }
        }    
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