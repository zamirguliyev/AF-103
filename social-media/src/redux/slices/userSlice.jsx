import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/index.js";

const initialState = {
  userId: localStorage.getItem("user") || null,
  isLoggedIn: localStorage.getItem("user") ? true : false,
  // user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload.id;
      state.isLoggedIn = true;
      localStorage.setItem("user", action.payload.id);
    },
    logoutUser: (state) => {
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
    setUserDetails: (state, action) => {
      const users = getAllUsers();

      const foundUser = users.find((user) => user.id === action.payload);

      if (foundUser) {
        state.user = foundUser;
      }
    },
  },
});

export const { loginUser, logoutUser, setUserDetails } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
