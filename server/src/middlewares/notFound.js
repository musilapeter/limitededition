const { sendError } = require('../utils/apiResponse');

const notFound = (req, res) => {
  return sendError(res, {
    statusCode: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { notFound };
