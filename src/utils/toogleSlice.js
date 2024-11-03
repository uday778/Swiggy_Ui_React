import { createSlice } from "@reduxjs/toolkit";



const toogleSlice = createSlice({
   name:"toogleSlice",
   initialState:{
    searchToogle:false,
    name:"Search"
   },
   reducers:{
        toogleSearchBar:(state)=>{
            state.searchToogle=!state.searchToogle
        }
   }
})


export const { toogleSearchBar } = toogleSlice.actions
export default toogleSlice.reducer