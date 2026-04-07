const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const inventoryService = require('../services/inventoryService');

const updateStock = asyncHandler(async (req, res) => {
  const data = await inventoryService.applyInventoryAction({
    ...req.body,
    actorId: req.user._id,
  });

  return sendSuccess(res, { data, message: 'Inventory updated' });
});

const logs = asyncHandler(async (req, res) => {
  const data = await inventoryService.listInventoryLogs();
  return sendSuccess(res, { data, message: 'Inventory logs fetched' });
});

const summary = asyncHandler(async (req, res) => {
  const data = await inventoryService.getInventorySummary();
  return sendSuccess(res, { data, message: 'Inventory summary fetched' });
});

module.exports = { updateStock, logs, summary };
