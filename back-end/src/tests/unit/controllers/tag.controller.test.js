const proxyquire = require('proxyquire').noCallThru();
const {saveJSON, getJSON, restore} = require('../../../utils/jsonHelpers');

let mockedData = getJSON();

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../../../utils/errors');

const tagController = proxyquire('../../../controllers/tag.controller', {
    '../models/Tag': class Tag {
        constructor(tag) {
            this.UUID = tag.UUID;
            this.name = tag.name;
            this.count = tag.count;
        }
        save() {
            saveJSON(mockedData);
            return this;
        }
        static find() {
            return mockedData.tags;
        }
        static findOne(query) {
            return mockedData.tags.find(tag => tag.UUID === query.UUID);
        }
        static deleteOne(UUID) {
            let toDelete = mockedData.tags.find(tag => tag.UUID === UUID);
            let index = mockedData.tags.indexOf(toDelete);
            mockedData.tags.splice(index, 1);
            return toDelete;
        }
    }
});

afterAll(() => {
    restore();
});

describe('Tag Controller', () => {
    describe('getAllTags', () => {
        it('should return all tags', async () => {
            let expectedTags = mockedData.tags;
            let tags = await tagController.getAllTags();
            expect(tags).toEqual(expectedTags);
        });
    }),
    describe('get', () => {
        it('should return a tag', async () => {
            let expectedTag = mockedData.tags.find(tag => tag.UUID === 'TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let tag = await tagController.get('TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(tag).toEqual(expectedTag);
        }),
        it('should throw a NotFoundError if the tag is not found', async () => {
            try {
                await tagController.get('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    }),
    describe('create', () => {
        it('should create a tag', async () => {
            let tag = {
                UUID: 'NEW-TAG',
                name: 'Tag 1',
                count: 0
            };
            let createdTag = await tagController.create(tag);
            expect(Object.assign({}, createdTag)).toEqual(tag);
        }),
        it('should throw a ConflictError if the tag already exists', async () => {
            try {
                let tag = {
                    UUID: 'NEW-TAG',
                    name: 'Tag 1',
                    count: 0
                };
                await tagController.create(tag);
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictError);
            }
        }),
        it('should throw a BadRequestError if the tag is not valid', async () => {
            try {
                let tag = {
                    UUID: 'NEW-TAG',
                    name: 'Tag 1'
                };
                await tagController.create(tag);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('update', () => {
        it('should update a tag', async () => {
            let tag = {
                count: 10
            };
            let updatedTag = await tagController.update('TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', tag);
            let toUpdate = mockedData.tags.find(tag => tag.UUID === 'TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(Object.assign({}, updatedTag)).toEqual(toUpdate);
        }),
        it('should throw a NotFoundError if the tag is not found', async () => {
            try {
                let tag = {
                    count: 10
                };
                await tagController.update('notFound', tag);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        }),
        it('should throw a BadRequestError if the tag is not valid', async () => {
            try {
                let tag = {};
                await tagController.update('TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e', tag);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestError);
            }
        })
    }),
    describe('delete', () => {
        it('should delete a tag', async () => {
            let toDelete = mockedData.tags.find(tag => tag.UUID === 'TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            let deletedTag = await tagController.delete('TAG-1f967358-d9b2-46d3-ae34-db9fd6d90c6e');
            expect(deletedTag).toEqual(toDelete);
        }),
        it('should throw a NotFoundError if the tag is not found', async () => {
            try {
                await tagController.delete('notFound');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
            }
        })
    })
});