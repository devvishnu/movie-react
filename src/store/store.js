import { configureStore } from '@reduxjs/toolkit'
import homeSlice from '../features/HomeSlice'
export const store = configureStore({
  reducer: {
    home:homeSlice
  },
})