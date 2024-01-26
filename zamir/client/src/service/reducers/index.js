import { createSlice } from "@reduxjs/toolkit";

const BASKET_STORAGE_KEY = "basket";
const WISHLIST_STORAGE_KEY = "wishlist";

const getInitialFromLocalStorage = (storageKey, defaultInitial) => {
  const storedValue = JSON.parse(localStorage.getItem(storageKey));
  return storedValue !== null ? storedValue : defaultInitial;
};

const initialBasketState = {
  items: getInitialFromLocalStorage(BASKET_STORAGE_KEY, []),
};

const initialWishlistState = {
  items: getInitialFromLocalStorage(WISHLIST_STORAGE_KEY, []),
};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {
    addToBasket(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const product = { ...action.payload, quantity: 1 };
        state.items.push(product);
      }

      localStorage.setItem("basket", JSON.stringify(state.items));
    },
    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
      localStorage.setItem("basket", JSON.stringify(state.items));
    },
  },
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id } = action.payload;
      if (!state.items.find((item) => item.id === id)) {
        state.items.push({ ...action.payload });
      }
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      const indexToRemove = state.items.findIndex((item) => item.id === id);
      if (indexToRemove !== -1) {
        state.items.splice(indexToRemove, 1);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const basketReducer = basketSlice.reducer;
export const wishlistReducer = wishlistSlice.reducer;
