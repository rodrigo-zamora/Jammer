const Comment = require('../models/Comment');
const Movie = require('../models/Movie');
const User = require('../models/User');

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require('../utils/errors');

const commentController = {
    create: async function (movieUUID, comment) {
        console.log(`Creating new comment for movie with uuid ${movieUUID}`);
        let movie = await Movie.findOne({
            UUID: movieUUID
        });
        if (!movie) {
            throw new NotFoundError(`Movie with uuid ${movieUUID} not found`);
        } else {
            try {
                let newComment = await new Comment(comment);
                newComment.movieUUID = movieUUID;
                let savedComment = await newComment.save();
                return savedComment;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    get: async function (commentUUID) {
        console.log(`Searching for comment with uuid ${commentUUID}`);
        let comment = await Comment.findOne({
            UUID: commentUUID
        });
        if (!comment) {
            throw new NotFoundError(`Comment with uuid ${commentUUID} not found`);
        } else {
            return comment;
        }
    },
    getAll: async function (movieUUID) {
        console.log(`Searching for comments for movie with uuid ${movieUUID}`);
        let movie = await Movie.findOne({
            UUID: movieUUID
        });
        if (!movie) {
            throw new NotFoundError(`Movie with uuid ${movieUUID} not found`);
        } else {
            let comments = await Comment.find({
                movieUUID: movieUUID
            });
            if (!comments) {
                throw new NotFoundError(`Comments for movie with uuid ${movieUUID} not found`);
            } else {
                return comments;
            }
        }
    },
    delete: async function (commentUUID, userUUID) {
        console.log(`Deleting comment with uuid ${commentUUID}`);
        let user = await User.findOne({
            UUID: userUUID
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            let comment = await Comment.findOne({
                UUID: commentUUID
            });
            if (!comment) {
                throw new NotFoundError(`Comment with uuid ${commentUUID} not found`);
            } else {
                if (comment.authorUUID !== userUUID) {
                    throw new UnauthorizedError(`User with uuid ${userUUID} is not authorized to delete comment with uuid ${commentUUID}`);
                } else {
                    await Comment.deleteOne({
                        UUID: commentUUID
                    });
                    return comment;
                }
            }
        }
    },
    update: async function (commentUUID, userUUID, comment) {
        console.log(`Updating comment with uuid ${commentUUID}`);
        let user = await User.findOne({
            UUID: userUUID
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            let toUpdate = await Comment.findOne({
                UUID: commentUUID
            });
            if (!toUpdate) {
                throw new NotFoundError(`Comment with uuid ${commentUUID} not found`);
            } else {
                if (toUpdate.authorUUID !== userUUID) {
                    throw new UnauthorizedError('You are not authorized to update this comment');
                } else {
                    toUpdate = new Comment(toUpdate);
                    try {
                        for (let key in comment) {
                            if (comment.hasOwnProperty(key)) {
                                toUpdate[key] = comment[key];
                            }
                        }
                        let savedComment = await toUpdate.save();
                        return savedComment;
                    } catch (err) {
                        throw new BadRequestError(err.message);
                    }
                }
            }  
        }
    },
    getAllForUser: async function (userUUID) {
        console.log(`Searching for comments for user with uuid ${userUUID}`);
        let comments = await Comment.find({
            authorUUID: userUUID
        });
        if (!comments) {
            throw new NotFoundError(`Comments for user with uuid ${userUUID} not found`);
        } else {
            return comments;
        }
    }
};

module.exports = commentController;