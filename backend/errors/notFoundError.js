const { NOT_FOUND } = require('../utils/errors');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
