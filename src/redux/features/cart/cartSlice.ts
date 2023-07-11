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
                (product: IProduct) => product._id === action.payload._id
            );
            if (existingProduct && existingProduct.quantity < 5) {
                existingProduct.quantity = existingProduct.quantity! + 1;
            } else if(!existingProduct){
                state.products.push({...action.payload, quantity:1})
            }
                
            // else if(existingProduct.quantity < 6) {
            // }
        },

        reduceFromCart: (state, action: PayloadAction<IProduct>) =>{
            const existingProduct = state.products.find(
                (product: IProduct) => product._id === action.payload._id
            );
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity = existingProduct.quantity! - 1;
            }
        },

        removeFromCart:(state, action: PayloadAction<IProduct>) =>{
            state.products = state.products.filter(
                (product: IProduct)=>product._id !== action.payload._id
            )
        }
    }
})

export const {addToCart, removeFromCart, reduceFromCart} = cartSlice.actions;
export default cartSlice.reducer;