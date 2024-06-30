import { createSlice } from '@reduxjs/toolkit'
import { REST_API_KEY, REDIRECT_URI, NAVER_ID } from './constant.jsx'
const initialState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    kakaoLogin: () => {
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&state=kakao-campusnow&response_type=code`
      window.open(link, 'kakaoLogin', 'width=500,height=600')
    },
    naverLogin: () => {
      const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&state=naver-campusnow&redirect_uri=${REDIRECT_URI}`
      window.open(link, 'naverLogin', 'width=500,height=600')
    },
  },
})

export const { kakaoLogin, naverLogin } = authSlice.actions

export default authSlice.reducer
