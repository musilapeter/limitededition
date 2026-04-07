import api from '../lib/axios';

export const fetchInventorySummary = async () => {
  const { data } = await api.get('/inventory/summary');
  return data.data;
};

export const fetchInventoryLogs = async () => {
  const { data } = await api.get('/inventory/logs');
  return data.data;
};

export const adjustInventory = async (payload) => {
  const { data } = await api.post('/inventory/adjust', payload);
  return data.data;
};
