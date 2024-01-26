import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./reducers/basketReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
  },
});

export default store;
