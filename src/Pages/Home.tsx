import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { kakaoLogin } from '../store/slices/authslice'
import LoginModal from '../Components/modal/Loginmodal'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  console.log(location)
  const navigate = useNavigate()
  useEffect(() => {
    navigate(location.pathname)
    console.log('컴포넌트가 마운트되었습니다.')
  }, [location])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleKakaoLogin = () => {
    dispatch(kakaoLogin())
  }

  return (
    <div>
      <h2>홈 페이지</h2>
      <p>이 페이지는 예시로 만든 홈 페이지입니다.</p>
      <button onClick={openModal}>로그인하기</button>
      <LoginModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onKakaoLogin={handleKakaoLogin}
      />
    </div>
  )
}

export default Home
