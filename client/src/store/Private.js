import { createSlice } from "@reduxjs/toolkit";


const PrivateSlice = createSlice({
    name:"privateData",
    initialState: false,
    reducers:{
        tokenData:(store,action)=>{
            return   store = action.payload   
}}})



export const PrivateSliceAction = PrivateSlice.actions
export default PrivateSlice 