import { configureStore } from '@reduxjs/toolkit'
import authslice from './slices/authslice'
const store = configureStore({
  reducer: {
    auth: authslice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
