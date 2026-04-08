import api from '../lib/axios';
import { mockCollections } from './mockData';

const shouldUseMockData =
  import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_BASE_URL;

export const fetchCollections = async () => {
  if (shouldUseMockData) return mockCollections;

  try {
    const { data } = await api.get('/collections');
    return data?.data ?? [];
  } catch (_error) {
    return mockCollections;
  }
};

export const fetchAdminCollections = async () => {
  if (shouldUseMockData) return mockCollections;

  try {
    const { data } = await api.get('/collections/admin/all');
    return data?.data ?? [];
  } catch (_error) {
    return mockCollections;
  }
};

export const fetchCollectionBySlug = async (slug) => {
  if (shouldUseMockData) return mockCollections.find((item) => item.slug === slug) || null;

  try {
    const { data } = await api.get(`/collections/${slug}`);
    return data?.data ?? null;
  } catch (_error) {
    return mockCollections.find((item) => item.slug === slug) || null;
  }
};
