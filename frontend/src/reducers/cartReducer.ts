import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Book from "../types/Book";

export interface CartProduct {
  product: Book;
  count: number;
}

interface CartReducer {
  products: CartProduct[];
  total?: number;
}

const initialState: CartReducer = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Book>) => {
      const prod = state.products.find(
        (cartProduct) => cartProduct.product.id === action.payload.id
      );

      if (prod) {
        prod.count++;
        return;
      }

      state.products.push({ product: action.payload, count: 1 });
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (cartProduct) => cartProduct.product.id !== action.payload
      );
    },
    updateCartProduct: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const cartProduct = state.products.find(
        (cartProduct) => cartProduct.product.id === action.payload.id
      );
      if (!cartProduct) return;
      const newCount = cartProduct.count + action.payload.count;
      if (newCount < 1) return;
      cartProduct.count = newCount;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const getTotal = (products: CartProduct[]) => {
  let total = 0;
  // products.forEach((prod) => (total += prod.count));
  total = products.length;

  return total;
};

const cartReducer = cartSlice.reducer;
export const {
  addProductToCart,
  removeProductFromCart,
  updateCartProduct,
  clearCart,
} = cartSlice.actions;
export default cartReducer;
