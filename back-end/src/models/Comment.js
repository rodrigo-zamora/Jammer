const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    authorID: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    movieID: {
        type: Schema.Types.ObjectID,
        ref: 'Movie',
        required: true
    },
    tags: [{
        tagID: {
            type: Schema.Types.ObjectID,
            ref: 'Tag',
            required: false
        }
    }],
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 500,
        validate: {
            validator: (text) => {
                return /^[a-zA-Z0-9\s\.,\?\!\:\;\(\)\-\_\=\+\*\&\%\$\#\@\[\]\{\}]+$/.test(text);
            }
        }
    },
    isPrivate: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection : 'comments' });

let Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;