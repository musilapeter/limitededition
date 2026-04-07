const Collection = require('../models/Collection');
const { AppError } = require('../utils/appError');

const listCollections = async () => {
  return Collection.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
};

const listAllCollections = async () => {
  return Collection.find().sort({ sortOrder: 1, createdAt: -1 });
};

const createCollection = async (payload) => {
  const exists = await Collection.findOne({ slug: payload.slug.toLowerCase() });
  if (exists) throw new AppError('Collection slug already exists', 409);

  return Collection.create({ ...payload, slug: payload.slug.toLowerCase() });
};

const updateCollection = async (id, payload) => {
  const updated = await Collection.findByIdAndUpdate(
    id,
    { ...payload, slug: payload.slug?.toLowerCase() },
    { new: true, runValidators: true },
  );

  if (!updated) throw new AppError('Collection not found', 404);
  return updated;
};

const deleteCollection = async (id) => {
  const deleted = await Collection.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Collection not found', 404);
  return deleted;
};

module.exports = {
  listCollections,
  listAllCollections,
  createCollection,
  updateCollection,
  deleteCollection,
};
