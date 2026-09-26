import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState={
     user:Cookies.get('user') ?? '',
    admin_token:Cookies.get('admin_token') ?? ''
}

export const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
        userDetails:((state,action)=>{
            state.user=action.payload.user,
            Cookies.set('user',action.payload.user)

              state.admin_token=action.payload.token,
            Cookies.set('admin_token',action.payload.token);
        }),
        logOut:((state)=>{
                state.user='',
            Cookies.remove('user')

            state.admin_token='',
            Cookies.remove('admin_token')
        })
    }
})


export const {userDetails,logOut} =loginSlice.actions;
export default loginSlice.reducer;