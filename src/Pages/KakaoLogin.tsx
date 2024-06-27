// src/components/KakaoLogin.tsx
import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchLoginData } from '../Redux/exampleSlice'

const KakaoLogin: React.FC = () => {
  const dispatch = useDispatch()

  const handleLoginClick = () => {
    dispatch(fetchLoginData() as any)
  }

  return (
    <button type="button" onClick={handleLoginClick}>
      로그인 하기
    </button>
  )
}

export default KakaoLogin
