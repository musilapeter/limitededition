import api from '../lib/axios';

export const fetchCollections = async () => {
  const { data } = await api.get('/collections');
  return data.data;
};

export const fetchAdminCollections = async () => {
  const { data } = await api.get('/collections/admin/all');
  return data.data;
};
