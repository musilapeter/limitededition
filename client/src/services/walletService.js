import axios from 'axios';
import { mockUsers } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Wallet Service: Handles user wallet operations (balance, transactions)
 * Keeps money/wallet logic separated from cart and auth concerns
 */

// Fallback: Get user wallet from mock data
const getWalletFromMock = (email) => {
  const userType = email?.includes('admin') ? 'admin' : 'customer';
  return mockUsers[userType].wallet;
};

// Fetch user wallet
export const fetchWallet = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/wallet/${userId}`);
    return response.data.wallet || {};
  } catch (error) {
    console.warn('Wallet fetch failed, using mock data');
    return getWalletFromMock();
  }
};

// Get wallet balance
export const getWalletBalance = async (userId) => {
  const wallet = await fetchWallet(userId);
  return wallet.balance || 0;
};

// Get transaction history
export const getTransactionHistory = async (userId) => {
  const wallet = await fetchWallet(userId);
  return wallet.transactionHistory || [];
};

// Add funds to wallet (mock: logs to console)
export const addFunds = async (userId, amount, reason = 'Store credit') => {
  try {
    const response = await axios.post(`${API_URL}/wallet/${userId}/add-funds`, {
      amount,
      reason,
    });
    return response.data;
  } catch (error) {
    console.warn('Add funds failed, using mock handling');
    const wallet = await fetchWallet(userId);
    wallet.balance = (wallet.balance || 0) + amount;
    console.log(`[Mock] Added $${amount} to wallet for reason: ${reason}`);
    return { success: true, message: 'Funds added' };
  }
};

// Deduct funds from wallet for purchase
export const deductFunds = async (userId, amount, reason = 'Purchase') => {
  try {
    const response = await axios.post(`${API_URL}/wallet/${userId}/deduct-funds`, {
      amount,
      reason,
    });
    return response.data;
  } catch (error) {
    console.warn('Deduct funds failed, using mock handling');
    const wallet = await fetchWallet(userId);
    const currentBalance = wallet.balance || 0;

    if (currentBalance < amount) {
      throw new Error(`Insufficient wallet balance. Available: $${currentBalance}, Required: $${amount}`);
    }

    wallet.balance = currentBalance - amount;
    console.log(`[Mock] Deducted $${amount} from wallet for: ${reason}`);
    return { success: true, message: 'Funds deducted', newBalance: wallet.balance };
  }
};
