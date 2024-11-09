import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { toast } from "react-toastify";

const auth = JSON.parse(localStorage.getItem('Ecommerrce-Web-Login-Users')) || {user : null , token : ""  }

const loginSlice = createSlice({
    name:"loginData",
    initialState: auth ,
    
        reducers:{
  login:(state,action)=>{
    


state.user =  action.payload.user ,
state.token = action.payload.token
  
 return localStorage.setItem("Ecommerrce-Web-Login-Users" , JSON.stringify(state) )
}  ,

logout:(state,action)=>{
state.user = null
state.token = ""

return  localStorage.removeItem("Ecommerrce-Web-Login-Users")
} 

,  

updateUser : (state ,action)=>{

state.user = action.payload.updatedUser
let ls = localStorage.getItem('Ecommerrce-Web-Login-Users')
    ls = JSON.parse(ls)
    ls.user = action.payload.updatedUser
    localStorage.setItem("Ecommerrce-Web-Login-Users",  JSON.stringify(ls) )
    toast.success('Profile Updated Succesfully')  
}
     



    }

})


export const loginSliceAction = loginSlice.actions
export default loginSlice 