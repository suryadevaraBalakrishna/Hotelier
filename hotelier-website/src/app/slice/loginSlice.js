import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";



const initialState={
  user:Cookies.get('user') ?? '',
  token:Cookies.get('token') ?? '',

}
export const loginSlice=createSlice({
     name:'login',
     initialState,
     reducers:{
        userDetails:(state,action)=>{
            state.user=action.payload.user;
            Cookies.set('user',action.payload.user);
            
            state.token=action.payload.token;
            Cookies.set('token',action.payload.token);
        },

        logOut:(state)=>{
            state.user='';
            Cookies.remove('user');

            state.token='';
            Cookies.remove('token');
        }
     }
})

export const {userDetails,logOut}=loginSlice.actions;
export default loginSlice.reducer;