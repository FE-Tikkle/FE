import { createSlice } from '@reduxjs/toolkit'
import { REST_API_KEY, REDIRECT_URI } from './constant.jsx'

const initialState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    kakaoLogin: () => {
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&state=campusnow&response_type=code`
      window.open(link, 'kakaoLogin', 'width=500,height=600')
    },
  },
})

export const { kakaoLogin } = authSlice.actions

export default authSlice.reducer
