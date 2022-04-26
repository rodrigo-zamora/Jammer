const Tag = require('../models/Tag');

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../utils/errors');

const tagController = {
    create: async function (tag) {
        console.log(`Creating new tag`);
        let toCreate = await Tag.findOne({
            name: tag.name
        });
        if (toCreate) {
            throw new ConflictError(`Tag with name ${tag.name} already exists`);
        } else {
            try {
                let newTag = await new Tag(tag);
                let savedTag = await newTag.save();
                return savedTag;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    },
    get: async function (tagUUID) {
        console.log(`Searching for tag with uuid ${tagUUID}`);
        let tag = await Tag.findOne({
            UUID: tagUUID
        });
        if (!tag) {
            throw new NotFoundError(`Tag with uuid ${tagUUID} not found`);
        } else {
            return tag;
        }
    },
    update: async function (tagUUID, tag) {
        console.log(`Updating tag with uuid ${tagUUID}`);
        if (Object.keys(tag).length === 0) {
            throw new BadRequestError('No data to update');
        }
        let toUpdate = await Tag.findOne({
            UUID: tagUUID
        });
        if (!toUpdate) {
            throw new NotFoundError(`Tag with uuid ${tagUUID} not found`);
        } else {
            toUpdate.name = tag.name;
            let savedTag = await toUpdate.save();
            return savedTag;
        }
    },
    delete: async function (tagUUID) {
        console.log(`Deleting tag with uuid ${tagUUID}`);
        let tag = await Tag.findOne({
            UUID: tagUUID
        });
        if (!tag) {
            throw new NotFoundError(`Tag with uuid ${tagUUID} not found`);
        } else {
            await tag.remove();
            return tag;
        }
    },
    getAll: async function () {
        console.log(`Searching for all tags`);
        let tags = await Tag.find({});
        return tags;
    }
};

module.exports = tagController;