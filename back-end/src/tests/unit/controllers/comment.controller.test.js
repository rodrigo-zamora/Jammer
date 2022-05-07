const proxyquire = require('proxyquire').noCallThru();
const {saveJSON, getJSON, restore} = require('../../../utils/jsonHelpers');

let mockedData = getJSON();

const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError
} = require('../../../utils/errors');

const commentController = proxyquire('../../../controllers/comment.controller', {
    '../models/Comment': class Comment {
        constructor(comment) {
            this.UUID = comment.UUID;
            this.authorUUID = comment.authorUUID;
            this.movieUUID = comment.movieUUID;
            this.tags = comment.tags;
            this.text = comment.text;
            this.isPrivate = comment.isPrivate;
            this.createdAt = comment.createdAt;
            this.updatedAt = comment.updatedAt;
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static find() {
            return mockedData.comments;
        }
        static findOne(query) {
            return mockedData.comments.find(comment => comment.UUID === query.UUID);
        }
        static deleteOne(UUID) {
            let toDelete = mockedData.comments.find(comment => comment.UUID === UUID);
            let index = mockedData.comments.indexOf(toDelete);
            mockedData.comments.splice(index, 1);
            return toDelete;
        }
    },
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
        static findOne(query) {
            return mockedData.movies.find(movie => movie.UUID === query.UUID);
        }
    },
    '../models/User': class User {
        static findOne(query) {
            return mockedData.users.find(user => user.UUID === query.UUID);
        }
    }
});

afterAll(() => {
    restore();
});

describe('Comment Controller', () => {
    describe('getAll', () => {
        it('should get all comments', async () => {
            let expectedComments = mockedData.comments.filter(comment => comment.movieUUID === 'MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let comments = await commentController.getAll('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(comments).toEqual(expectedComments);
        }),
        it('should throw a NotFoundError if the movie is not found', async () => {
            try {
                await commentController.getAll('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a NotFoundError if no comments are found', async () => {
            try {
                await commentController.getAll('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('get', () => {
        it('should get a comment', async () => {
            let expectedComment = mockedData.comments.find(comment => comment.UUID === 'COMMENT1-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let comment = await commentController.get('COMMENT1-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(comment).toEqual(expectedComment);
        }),
        it('should throw a NotFoundError if the comment is not found', async () => {
            try {
                await commentController.get('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('create', () => {
        it('should create a comment', async () => {
            let comment = {
                UUID: 'COMMENTUUID',
                authorUUID: '1f967358-d9b2-46d3-ae34-db9fd6d90c6e',
                movieUUID: 'MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e',
                tags: [],
                text: 'This is a comment',
                isPrivate: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            let createdComment = await commentController.create('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', comment);
            expect(Object.assign({}, createdComment)).toEqual(Object.assign({}, comment));
        }),
        it('should throw a BadRequestError if the comment is not valid', async () => {
            try {
                await commentController.create('MOVIE-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {});
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('delete', () => {
        it('should delete a comment', async () => {
            let toDelete = mockedData.comments.find(comment => comment.UUID === 'COMMENT3-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let comment = await commentController.delete('COMMENT3-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(comment).toEqual(toDelete);
        }),
        it('should throw a NotFoundError if the comment is not found', async () => {
            try {
                await commentController.delete('COMMENT3-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a UnauthorizedError if the comment is not owned by the user', async () => {
            try {
                await commentController.delete('COMMENT2-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedError);
            }
        })
    }),
    describe('update', () => {
        it('should update a comment', async () => {
            let toUpdate = mockedData.comments.find(comment => comment.UUID === 'COMMENT1-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let updatedComment = await commentController.update('COMMENT1-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '1f967358-d9b2-46d3-ae34-db9fd6d90c6e', {
                text: 'This is a test comment'
            });
            expect(Object.assign({}, updatedComment)).toEqual(Object.assign({}, toUpdate));
        }),
        it('should throw a NotFoundError if the comment is not found', async () => {
            try {
                await commentController.update('COMMENT4-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e', {});
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a UnauthorizedError if the comment is not owned by the user', async () => {
            try {
                await commentController.update('COMMENT2-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', '2f967358-d9b2-46d3-ae34-db9fd6d90c6e', {});
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedError);
            }
        })
    }),
    describe('getAllForUser', () => {
        it('should get all comments for a user', async () => {
            let comments = await commentController.getAllForUser('1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(comments).toEqual(mockedData.comments.filter(comment => comment.authorUUID === '1f967358-d9b2-46d3-ae34-db9fd6d90c6e'));
        }),
        it('should throw a NotFoundError if the user is not found', async () => {
            try {
                await commentController.getAllForUser('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    })
});