const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const collectionService = require('../services/collectionService');

const listPublic = asyncHandler(async (req, res) => {
  const data = await collectionService.listCollections();
  return sendSuccess(res, { data, message: 'Collections fetched' });
});

const listAdmin = asyncHandler(async (req, res) => {
  const data = await collectionService.listAllCollections();
  return sendSuccess(res, { data, message: 'All collections fetched' });
});

const create = asyncHandler(async (req, res) => {
  const data = await collectionService.createCollection(req.body);
  return sendSuccess(res, { statusCode: 201, data, message: 'Collection created' });
});

const update = asyncHandler(async (req, res) => {
  const data = await collectionService.updateCollection(req.params.id, req.body);
  return sendSuccess(res, { data, message: 'Collection updated' });
});

const remove = asyncHandler(async (req, res) => {
  await collectionService.deleteCollection(req.params.id);
  return sendSuccess(res, { message: 'Collection deleted' });
});

module.exports = { listPublic, listAdmin, create, update, remove };
