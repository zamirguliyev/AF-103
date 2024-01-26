import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

export const { login, logout, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
