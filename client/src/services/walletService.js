import axios from 'axios';
import { mockUsers } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const getWalletFromMock = () => mockUsers.customer.wallet;

export const fetchWallet = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/wallet/${userId}`);
    return response.data.wallet || {};
  } catch {
    console.warn('Wallet fetch failed, using mock data');
    return getWalletFromMock();
  }
};

export const getWalletBalance = async (userId) => {
  const wallet = await fetchWallet(userId);
  return wallet.balance || 0;
};

export const getTransactionHistory = async (userId) => {
  const wallet = await fetchWallet(userId);
  return wallet.transactionHistory || [];
};

export const addFunds = async (userId, amount, reason = 'Store credit') => {
  try {
    const response = await axios.post(`${API_URL}/wallet/${userId}/add-funds`, {
      amount,
      reason,
    });
    return response.data;
  } catch {
    console.warn('Add funds failed, using mock handling');
    const wallet = await fetchWallet(userId);
    wallet.balance = (wallet.balance || 0) + amount;
    return { success: true, message: 'Funds added' };
  }
};

export const deductFunds = async (userId, amount, reason = 'Purchase') => {
  try {
    const response = await axios.post(`${API_URL}/wallet/${userId}/deduct-funds`, {
      amount,
      reason,
    });
    return response.data;
  } catch {
    console.warn('Deduct funds failed, using mock handling');
    const wallet = await fetchWallet(userId);
    const currentBalance = wallet.balance || 0;

    if (currentBalance < amount) {
      throw new Error(`Insufficient wallet balance. Available: $${currentBalance}, Required: $${amount}`);
    }

    wallet.balance = currentBalance - amount;
    return { success: true, message: 'Funds deducted', newBalance: wallet.balance };
  }
};
