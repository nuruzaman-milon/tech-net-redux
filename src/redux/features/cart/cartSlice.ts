import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface ICart {
    products: IProduct[]
}


const initialState : ICart = {
    products:[]
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<IProduct>) =>{

            const existingProduct = state.products.find(
                (product) => product._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity = existingProduct.quantity! + 1;
            } else {
                state.products.push({...action.payload, quantity:1})
            }
        }
    }
})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;