import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  kakaoLogin,
  naverLogin,
  googleLogin,
  GoogleAuthData,
} from '../../store/slices/authslice'
import { RootState } from '../../store/store'
import LoginModal from '../Login/Loginmodal'
import { postgoogleAuth, postsign } from '../../api'
import LoginButton from './Loginbutton'
import DataListener from './DataListener'
import InfoModal from '../Login/informodal'

const AuthHandler: React.FC = () => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')
  const dispatch = useDispatch()
  const googleAuthData = useSelector(
    (state: RootState) => state.auth.googleAuthData
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    department: '',
    extraDepartments: ['', '', ''],
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsModalOpen(true) 
    }
    const inNewValue = localStorage.getItem('is_new') === 'true'
    if (inNewValue) openInfoModal()
    console.log(isLoggedIn);
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (code && state) {
      setIsLoggedIn(true)
      if (state.includes('kakao')) postsign(code, 'kakao')
      else if (state.includes('naver')) postsign(code, 'naver')
      else if (state.includes('google')) {
        console.log(code)
        handleGoogleAuthData(code)
      }
    }
  }, [code, state])

  useEffect(() => {
    if (googleAuthData.code) {
      console.log('Updated googleAuthData:', googleAuthData)
      handlePostGoogleAuth()
    }
  }, [googleAuthData])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openInfoModal = () => setIsInfoModalOpen(true)
  const closeInfoModal = () => setIsInfoModalOpen(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target

    if (id.startsWith('extra-department')) {
      const index = parseInt(id.split('-')[2]) - 1
      setFormData(prev => ({
        ...prev,
        extraDepartments: prev.extraDepartments.map((dept, i) =>
          i === index ? value : dept
        ),
      }))
    } else {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
  }

  const handleSubmit = () => {
    console.log('Form Data:', formData)
    closeInfoModal()
  }

  const handleKakaoLogin = () => {
    dispatch(kakaoLogin())
    closeModal()
  }

  const handleNaverLogin = () => {
    dispatch(naverLogin())
    closeModal()
  }

  const handleGoogleLogin = () => {
    dispatch(googleLogin())
    closeModal()
  }

  const handleGoogleAuthData = (code: string) => {
    console.log(code)
    dispatch(GoogleAuthData({ code }))
    closeModal()
  }

  const handlePostGoogleAuth = () => {
    if (googleAuthData) {
      postgoogleAuth(googleAuthData)
    } else {
      console.log('Google authentication data is missing')
    }
  }

  const receiveAuthData = (authData: any) => {
    console.log('Received auth data in Home component:', authData)
  }

  return (
    <div>
      <DataListener onReceiveAuthData={receiveAuthData} />

      <LoginButton onClick={openModal} />
      <LoginModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onKakaoLogin={handleKakaoLogin}
        onNaverLogin={handleNaverLogin}
        onGoogleLogin={handleGoogleLogin}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default AuthHandler