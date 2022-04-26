const Comment = require('../models/Comment');

const {
    NotFoundError,
    BadRequestError
} = require('../utils/errors');

const commentController = {
    create: async function (userUUID, movieUUID, comment) {
        console.log(`Creating new comment for movie with uuid ${movieUUID}`);
        try {
            let newComment = await new Comment(comment);
            let savedComment = await newComment.save();
            return savedComment;
        } catch (err) {
            throw new BadRequestError(err.message);
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
        let comments = await Comment.find({
            movieUUID: movieUUID
        });
        if (!comments) {
            throw new NotFoundError(`Comments for movie with uuid ${movieUUID} not found`);
        } else {
            return comments;
        }
    },
    // Update with userUUID
    delete: async function (commentUUID, userUUID) {
        console.log(`Deleting comment with uuid ${commentUUID}`);
        let comment = await Comment.findOne({
            UUID: commentUUID
        });
        if (!comment) {
            throw new NotFoundError(`Comment with uuid ${commentUUID} not found`);
        } else {
            await comment.remove();
            return comment;
        }
    },
    // Update with userUUID
    update: async function (commentUUID, userUUID, comment) {
        console.log(`Updating comment with uuid ${commentUUID}`);
        let commentToUpdate = await Comment.findOne({
            UUID: commentUUID
        });
        if (!commentToUpdate) {
            throw new NotFoundError(`Comment with uuid ${commentUUID} not found`);
        } else {
            try {
                for (key in comment) {
                    if (comment.hasOwnProperty(key)) {
                        commentToUpdate[key] = comment[key];
                    }
                }
                let savedComment = await commentToUpdate.save();
                return savedComment;
            } catch (err) {
                throw new BadRequestError(err.message);
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