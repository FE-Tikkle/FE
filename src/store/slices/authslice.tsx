import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  REST_API_KEY,
  REDIRECT_URI,
  NAVER_ID,
  GOOGLE_ID,
  GOOGLE_SECRET_ID,
} from './constant.jsx'

interface GoogleAuthBody {
  client_id: string
  client_secret: string
  code: string
  grant_type: string
  redirect_uri: string
  state: string
}

interface AuthState {
  googleAuthData: GoogleAuthBody
}

const initialState: AuthState = {
  googleAuthData: {
    client_id: GOOGLE_ID,
    client_secret: GOOGLE_SECRET_ID,
    code: '',
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    state: 'Campusnow-google',
  },
}

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
    GoogleAuthData: (state, action: PayloadAction<{ code: string | null }>) => {
      // console.log('GoogleAuthData reducer called:', action.payload)
      state.googleAuthData.code = action.payload.code || ''
      // console.log('Updated state:', state.googleAuthData)
    },
  },
})

export const { kakaoLogin, naverLogin, googleLogin, GoogleAuthData } =
  authSlice.actions

export default authSlice.reducer
