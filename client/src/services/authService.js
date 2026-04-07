import api from '../lib/axios';
import { mockUsers } from './mockData';

export const registerUser = async (payload) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data.data;
  } catch (_error) {
    return {
      token: 'mock-token-customer',
      user: {
        ...mockUsers.customer,
        name: payload.name || mockUsers.customer.name,
        email: payload.email || mockUsers.customer.email,
      },
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data.data;
  } catch (_error) {
    const isAdmin = (payload.email || '').toLowerCase().includes('admin');
    return {
      token: isAdmin ? 'mock-token-admin' : 'mock-token-customer',
      user: isAdmin
        ? { ...mockUsers.admin, email: payload.email || mockUsers.admin.email }
        : { ...mockUsers.customer, email: payload.email || mockUsers.customer.email },
    };
  }
};

export const fetchMe = async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data.data.user;
  } catch (_error) {
    return mockUsers.customer;
  }
};
