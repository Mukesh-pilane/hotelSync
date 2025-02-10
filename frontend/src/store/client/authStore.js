import { create } from 'zustand';
import { getToken, getUserData } from '../../utility/localStorageUtils';


const initialState = {
  isAuthenticated: getToken() ? true : false,
  userData: getUserData() || {}
};

export const useAuthStore = create((set) => ({
  ...initialState,
  setAuth: (data) => {
    set(() => (data));
  },
}));