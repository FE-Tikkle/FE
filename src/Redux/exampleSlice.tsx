// src/redux/exampleSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../Axios'

interface ExampleState {
  data: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null // 오류 상태는 null 또는 string이어야 합니다.
}

const initialState: ExampleState = {
  data: null,
  status: 'idle',
  error: null,
}

// 비동기 Thunk 액션 생성
export const fetchLoginData = createAsyncThunk(
  'example/fetchLoginData',
  async () => {
    const response = await instance.get('/auth/login?provider=kakao')
    return response.data
  }
)

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLoginData.pending, state => {
        state.status = 'loading'
        state.error = null // 요청 중 오류 상태를 초기화
      })
      .addCase(fetchLoginData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        state.error = null // 요청 성공 시 오류 상태를 초기화
      })
      .addCase(fetchLoginData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong' // 오류 메시지가 없는 경우 기본 메시지 설정
      })
  },
})

export default exampleSlice.reducer
