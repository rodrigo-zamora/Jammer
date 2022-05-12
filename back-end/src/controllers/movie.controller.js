const axios = require('axios').default;

const Movie = require('../models/Movie');
const Cuevana3 = require('../utils/cuevana3');

const cuevanaURL = "https://d123-177-241-39-34.ngrok.io";

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../utils/errors');

const movieController = {
    getAllMovies: function () {
        console.log('Get all movies');
        return Movie.find({});
    },
    get: async function (uuid) {
        console.log(`Searching for movie with uuid ${uuid}`);
        let movie = await Movie.findOne({
            UUID: uuid
        });
        if (!movie) {
            throw new NotFoundError(`Movie with uuid ${uuid} not found`);
        } else {
            return movie;
        }
    },
    create: async function (movie) {
        console.log('Creating movie: ', movie.title);
        let toCreate = await Movie.findOne({
            title: movie.title
        });
        if (toCreate) {
            throw new ConflictError(`Movie with title ${movie.title} already exists`);
        } else {
            try {
                let newMovie = await new Movie(movie);
                let savedMovie = await newMovie.save();
                return savedMovie;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    update: async function (uuid, movie) {
        console.log(`Searching for movie with uuid ${uuid}`);
        let toUpdate = await Movie.findOne({
            UUID: uuid
        });
        if (!toUpdate) {
            throw new NotFoundError(`Movie with uuid ${uuid} not found`);
        } else {
            toUpdate = new Movie(toUpdate);
            try {
                for (let key in movie) {
                    if (movie.hasOwnProperty(key)) {
                        toUpdate[key] = movie[key];
                    }
                }
                let savedMovie = await toUpdate.save();
                return savedMovie;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    delete: async function (uuid) {
        console.log(`Deleting movie with uuid ${uuid}`);
        let toDelete = await Movie.findOne({
            UUID: uuid
        });
        if (!toDelete) {
            throw new NotFoundError(`Movie with uuid ${uuid} not found`);
        } else {
            try {
                await Movie.deleteOne({
                    UUID: uuid
                });
                return toDelete;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    search: async function (query) {
        if (Object.keys(query).length === 0) {
            throw new BadRequestError('Query is empty');
        } else {
            let moviesList = [];
            for (key in query) {
                if (query.hasOwnProperty(key)) {
                    if (key == 'title') {
                        console.log('Searching for movies with title: ', query[key]);
                        return axios
                            .get(`${cuevanaURL}/getSearch/${query[key]}/1`)
                            .then(response => {
                                console.log('Response: ', response.data);
                                return response.data;
                            }).catch(err => {
                                throw new BadRequestError(err.message);
                            });
                    }
                    if (key == 'genre') {
                        let genres = {
                            0: "Acción",
                            1: "Animación",
                            2: "Aventura",
                            3: "Bélico Guerra",
                            4: "Biográfia",
                            5: "Ciencia Ficción",
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
                        let movies = await Movie.find({
                            genre: genre
                        }).sort({
                            title: 1
                        }).limit(50);
                        let randomMovies = [];
                        while (randomMovies.length < 20) {
                            let randomIndex = Math.floor(Math.random() * movies.length);
                            if (!randomMovies.includes(movies[randomIndex])) {
                                randomMovies.push(movies[randomIndex]);
                            }
                        }
                        moviesList = moviesList.concat(randomMovies);
                    }
                    if (key == 'actor') {
                        console.log('Searching for movies with actor: ', query[key]);
                        let movies = await Movie.find({
                                actors: {
                                    $in: [query[key]]
                                }
                            })
                            .limit(20);
                        moviesList = moviesList.concat(movies);
                    }
                    if (key == 'year') {
                        console.log('Searching for movies with year: ', query[key]);
                        let movies = await Movie.find({
                                year: {
                                    $in: [query[key]]
                                }
                            })
                            .limit(20);
                        moviesList = moviesList.concat(movies);
                    }
                }
            }
            return moviesList;
        }
    },
    getDetails: async function (cuevanaUUID) {
        console.log('Searching for details of movie with cuevanaUUID: ', cuevanaUUID);
        return axios
            .get(`${cuevanaURL}/getDetail/${cuevanaUUID}`)
            .then(response => {
                console.log('Response: ', response.data);
                return response.data;
            }).catch(err => {
                throw new BadRequestError(err.message);
            });
    },
    getLinks: async function (cuevanaUUID) {
        console.log('Searching for links of movie with cuevanaUUID: ', cuevanaUUID);
        let movieLinks;
        return axios
            .get(`${cuevanaURL}/getLinks/${cuevanaUUID}`)
            .then(response => {
                console.log('Response: ', response.data);
                return response.data;
            });
    },
    createFromCuevanaUUID: async function (cuevanaUUID) {
        console.log('Creating movie from cuevanaUUID: ', cuevanaUUID);
        let movieDetails = await this.getDetails(cuevanaUUID);
        //console.log("Movie details: ", JSON.stringify(movieDetails));
        let toCreate = {
            cuevanaUUID: cuevanaUUID,
            title: movieDetails[0].title,
            poster: movieDetails[0].poster,
            year: movieDetails[0].year,
            sypnosis: movieDetails[0].sypnosis,
            duration: movieDetails[0].duration,
            rating: 0,
            cast: [],
            genre: []
        };
        console.log("Movie to create: " + JSON.stringify(toCreate));
        let newMovie = new Movie(toCreate);
        let savedMovie = await newMovie.save();
        return savedMovie;
    }
};

module.exports = movieController;