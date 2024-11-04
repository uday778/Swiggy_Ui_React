import { createSlice } from "@reduxjs/toolkit";



const toogleSlice = createSlice({
   name:"toogleSlice",
   initialState:{
    searchToogle:false,
    loginToggle:false
   },
   reducers:{
        toogleSearchBar:(state)=>{
            state.searchToogle=!state.searchToogle
        },
        toogleLogin:(state)=>{
            state.loginToggle=!state.loginToggle
        }
   }
})


export const { toogleSearchBar,toogleLogin } = toogleSlice.actions
export default toogleSlice.reducer