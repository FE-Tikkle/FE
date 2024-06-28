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

// 커스텀 훅 추가
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
