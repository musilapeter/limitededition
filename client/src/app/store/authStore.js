import { create } from 'zustand';

const initialUser = JSON.parse(localStorage.getItem('le_user') || 'null');

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('le_token') || '',
  user: initialUser,
  setAuth: ({ token, user }) => {
    localStorage.setItem('le_token', token);
    localStorage.setItem('le_user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('le_token');
    localStorage.removeItem('le_user');
    set({ token: '', user: null });
  },
}));
