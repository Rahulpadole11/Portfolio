import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuthenticated: false,
    isOpen: false,
    activeTab: 'dashboard',
    message: '',
    password: '',
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearMessage: (state) => {
      state.message = '';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.password = '';
      state.message = '';
    },
  },
});

export const {
  setAuthenticated,
  setIsOpen,
  setActiveTab,
  setMessage,
  setPassword,
  clearMessage,
  logout,
} = adminSlice.actions;

export default adminSlice.reducer;
