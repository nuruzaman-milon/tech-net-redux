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
                (product) => product._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity = existingProduct.quantity! + 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 })
            }
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;