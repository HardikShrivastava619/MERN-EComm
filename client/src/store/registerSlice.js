import { createSlice } from "@reduxjs/toolkit";

const cd = JSON.parse(localStorage.getItem('Ecommerrce-Web-Registered-Users'))  || []

const registerSlice = createSlice({
    name:"registerdata",
    initialState: cd,
    
        reducers:{
  register:(state,action)=>{
    console.log(action.payload);
    
    state.push(action.payload.updatedUser)


 return localStorage.setItem("Ecommerrce-Web-Registered-Users" , JSON.stringify(state))
} 

    }

})


export const registerSliceAction = registerSlice.actions
export default registerSlice 