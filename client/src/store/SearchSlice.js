import { createSlice } from "@reduxjs/toolkit";
const searchedkeyword = JSON.parse(localStorage.getItem('searchkeyword'))  || ""   
const searchedResults = JSON.parse(localStorage.getItem('searchresults')) ||  []
const searchSlice = createSlice({
    name: 'searchData',
    initialState:{keyword:searchedkeyword,
                  results:searchedResults
                },
    reducers:{
searchedkeyword : (state , action )=>{
  console.log(action.payload)
  
state.keyword = action.payload
return localStorage.setItem("searchkeyword" , JSON.stringify(state.keyword) )

},

  searchedResults : (state,action)=>{
    console.log(action.payload)
    state.results = action.payload
return    localStorage.setItem("searchresults" , JSON.stringify(state.results) )
  }


}




})


export const searchSliceAction = searchSlice.actions
export default searchSlice