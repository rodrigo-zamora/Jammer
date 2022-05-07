const proxyquire = require('proxyquire').noCallThru();
const {saveJSON, getJSON, restore} = require('../../../utils/jsonHelpers');

let mockedData = getJSON();

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../../../utils/errors');

const Cuevana3 = require('../../../utils/cuevana3');

const movieController = proxyquire('../../../controllers/movie.controller', {
    '../models/Movie': class Movie {
        constructor(movie) {
            this.UUID = movie.UUID;
            this.cuevanaUUID = movie.cuevanaUUID;
            this.title = movie.title;
            this.poster = movie.poster;
            this.year = movie.year;
            this.sypnosis = movie.sypnosis;
            this.rating = movie.rating;
            this.duration = movie.duration;
            this.genres = movie.genres;
            this.cast = movie.cast;
            mockedData.movies.push(movie);
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static find() {
            return mockedData.movies;
        }
        static findOne(query) {
            return mockedData.movies.find(movie => movie.UUID === query.UUID);
        }
        static deleteOne(UUID) {
            let toDelete = mockedData.movies.find(movie => movie.UUID === UUID);
            let index = mockedData.movies.indexOf(toDelete);
            mockedData.movies.splice(index, 1);
            return toDelete;
        }
    }
});

afterAll(() => {
    restore();
});

describe('Movie controller', () => {
    describe('getAllMovies', () => {
        it('should return all movies', async () => {
            let expectedMovies = mockedData.movies;
            let movies = await movieController.getAllMovies();
            expect(movies).toEqual(expectedMovies);
        })
    }),
    describe('get', () => {
        it('should return a movie', async () => {
            let expectedMovie = mockedData.movies.find(movie => movie.UUID === 'MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let movie = await movieController.get('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(movie).toEqual(expectedMovie);
        }),
        it('should throw a NotFoundError if the movie is not found', async () => {
            try {
                await movieController.get('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('create', () => {
        it('should create a movie', async () => {
            let movie = {
                UUID: 'MOVIE-2f967358-d9b2-46d3-ae34-db9fd6d90c6e',
                cuevanaUUID: 'testMovie/456789',
                title: 'The Lord of the Rings: The Fellowship of the Ring',
                poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTEyMjAwMDU1OV5BMl5BanBnXkFtZTcwNDQyNTkxMw@@._V1_SX300.jpg',
                year: 2001,
                sypnosis: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
                rating: '14',
                duration: '1h 30m',
                genres: ['Adventure', 'Fantasy', 'Drama'],
                cast: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen', 'Orlando Bloom', 'Sean Astin']
            };
            let expectedMovie = await movieController.create(movie);
            expect(Object.assign({}, expectedMovie)).toEqual(movie);
        }),
        it('should throw a ConflictError if the movie already exists', async () => {
            try {
                await movieController.create(mockedData.movies[0]);
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictError);
            }
        }),
        it('should throw a BadRequestError if the movie is not valid', async () => {
            try {
                await movieController.create({});
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('update', () => {
        it('should update a movie', async () => {
            let movie = {
                year: 2002
            }
            let expectedMovie = await movieController.update('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', movie);
            let toUpdate = mockedData.movies.find(movie => movie.UUID === 'MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(Object.assign({}, toUpdate, movie)).toEqual(Object.assign({}, expectedMovie));
        }),
        it('should throw a NotFoundError if the movie is not found', async () => {
            try {
                await movieController.update('notFound', {});
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a BadRequestError if the movie is not valid', async () => {
            try {
                await movieController.update('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {});
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('delete', () => {
        it('should delete a movie', async () => {
            let toDelete = mockedData.movies.find(movie => movie.UUID === 'MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let movie = await movieController.delete('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(movie).toEqual(toDelete);
        }),
        it('should throw a NotFoundError if the movie is not found', async () => {
            try {
                await movieController.delete('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('search', () => {
        it('should return all movies that match the query title', async () => {
            let query = {
                title: 'Coco'
            };
            let expectedMovies = await Cuevana3.getSearch('Coco', 1);
            let movies = await movieController.search(query);
            expect(movies).toEqual(expectedMovies);
        })
    })
})