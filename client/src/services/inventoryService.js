import api from '../lib/axios';
import { mockInventoryLogs, mockInventorySummary } from './mockData';

let localLogs = [...mockInventoryLogs];

export const fetchInventorySummary = async () => {
  try {
    const { data } = await api.get('/inventory/summary');
    return data.data;
  } catch (_error) {
    return mockInventorySummary;
  }
};

export const fetchInventoryLogs = async () => {
  try {
    const { data } = await api.get('/inventory/logs');
    return data.data;
  } catch (_error) {
    return localLogs;
  }
};

export const adjustInventory = async (payload) => {
  try {
    const { data } = await api.post('/inventory/adjust', payload);
    return data.data;
  } catch (_error) {
    localLogs = [
      {
        _id: `log-${Date.now()}`,
        sku: payload.variantId,
        action: payload.action,
        previousQuantity: 0,
        quantityChange: payload.action === 'reduce' ? -payload.quantity : payload.quantity,
        newQuantity: payload.quantity,
        reason: payload.reason || 'Demo adjustment',
      },
      ...localLogs,
    ];

    return { success: true };
  }
};
