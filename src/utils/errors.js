class NotFoundError extends Error {
    constructor(message, options) {
        super(`404 not found: ${message}`, options);
    }
}

module.exports = {
    NotFoundError
};