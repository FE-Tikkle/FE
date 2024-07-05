import { createSlice } from '@reduxjs/toolkit'
import { REST_API_KEY, REDIRECT_URI, NAVER_ID, GOOGLE_ID } from './constant.jsx'
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
      const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&state=CampusNow-naver&redirect_uri=${REDIRECT_URI}`
      window.open(link, 'naverLogin', 'width=500,height=600')
    },
    googleLogin: () => {
      const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile+email+openid&state=Campusnow-google`
      window.open(link, 'googleLogin', 'width=500,height=600')
    },
  },
})

export const { kakaoLogin, naverLogin, googleLogin } = authSlice.actions

export default authSlice.reducer
