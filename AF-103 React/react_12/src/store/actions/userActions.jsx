import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userDetails: null,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userDetails = null; 
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
      state.isLoggedIn = true; 
    },
  },
});

export const { login, logout, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
