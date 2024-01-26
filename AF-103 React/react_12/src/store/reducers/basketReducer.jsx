import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket(state, action) {
      state.items.push(action.payload);
    },
    removeFromBasket(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToBasket, removeFromBasket,updateQuantity } = basketSlice.actions;
export default basketSlice.reducer;
