import {configureStore} from '@reduxjs/toolkit'
import registerSlice from './registerSlice'
import loginSlice from './loginSlice'
import PrivateSlice from './Private'
import searchSlice from './SearchSlice'
import CartSlice from './CartSlice'


const finalStore = configureStore({
reducer:{
  registerdata : registerSlice.reducer,
  loginData  : loginSlice.reducer,
  privateData: PrivateSlice.reducer,
  searchData : searchSlice.reducer,
  cartData : CartSlice.reducer
}})


export default finalStore