import api from '../lib/axios';
import { mockCollections } from './mockData';

export const fetchCollections = async () => {
  try {
    const { data } = await api.get('/collections');
    return data?.data ?? [];
  } catch (_error) {
    return mockCollections;
  }
};

export const fetchAdminCollections = async () => {
  const { data } = await api.get('/collections/admin/all');
  return data?.data ?? [];
};
