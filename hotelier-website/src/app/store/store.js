import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../slice/loginSlice'
import bookingSlice from '../slice/bookingSlice'

export const myStore = configureStore({
  reducer: {
    login:loginSlice,
    booking:bookingSlice
  },
})

