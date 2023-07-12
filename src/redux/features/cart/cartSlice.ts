import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    products: IProduct[];
    total: number;
}


const initialState: ICart = {
    products: [],
    total: 0
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.products.find(
                (product: IProduct) => product._id === action.payload._id
            );
            if (existingProduct && existingProduct.quantity! < 5) {
                existingProduct.quantity = existingProduct.quantity! + 1;
                state.total = state.total + action.payload.price;
            } else if (!existingProduct) {
                state.products.push({ ...action.payload, quantity: 1 })
                state.total = state.total + action.payload.price;
            }
        },

        reduceFromCart: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.products.find(
                (product: IProduct) => product._id === action.payload._id
            );
            if (existingProduct && existingProduct.quantity! > 1) {
                existingProduct.quantity = existingProduct.quantity! - 1;
                state.total = state.total - action.payload.price;
            }
        },

        removeFromCart: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.filter(
                (product: IProduct) => product._id !== action.payload._id
            )
            state.total = state.total - action.payload.price * action.payload.quantity!;
        }
    }
})

export const { addToCart, removeFromCart, reduceFromCart } = cartSlice.actions;
export default cartSlice.reducer;