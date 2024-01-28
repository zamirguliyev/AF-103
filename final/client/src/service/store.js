import { configureStore } from '@reduxjs/toolkit';
import { basketReducer, wishlistReducer } from './reducers';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    wishlist: wishlistReducer,
  },
});
