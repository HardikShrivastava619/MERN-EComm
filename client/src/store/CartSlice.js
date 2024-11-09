import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cart = JSON.parse(localStorage.getItem('Ecommerce-Web-Cart-Product')) || []


const CartSlice = createSlice({
    name : "CartData",
    initialState: cart,
    reducers:{
Cart : (state , action )=>{
  const check = state.some(item => item._id === action.payload._id)
   if (check === true) {
    return 
   }else
state.push(action.payload) 
 return localStorage.setItem('Ecommerce-Web-Cart-Product' , JSON.stringify(state) )

},
         
CartItemRemover: (state, action) => {
  const updatedState = state.filter((p) => p._id !== action.payload);
  localStorage.setItem('Ecommerce-Web-Cart-Product', JSON.stringify(updatedState))
  return updatedState;
},
   



 cartItem : (state ,action)=>{
 return  state = []
}}},)




export const CartSliceAction = CartSlice.actions

export default CartSlice