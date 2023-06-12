import { configureStore } from '@reduxjs/toolkit'
import user from './Slices/userSlice';
import cart from './Slices/cartSlice'

export const store = configureStore({
  reducer: {
    'user' : user,
    'cart' : cart
  },
})