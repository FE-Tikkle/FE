import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { kakaoLogin } from '../store/slices/authslice'
import LoginModal from '../Components/modal/Loginmodal'
import { postsign } from '../api'

const Home: React.FC = () => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (code) {
      postsign(code, 'kakao')
        .then(() => {
          dispatch(kakaoLogin())
        })
        .catch(error => {
          console.error('Postsign error:', error)
        })
    }
  }, [code, dispatch])

  const handleKakaoLogin = () => {
    dispatch(kakaoLogin())
  }

  return (
    <div>
      {code ? (
        <div>
          <p>로그인 중입니다. 잠시만 기다려주세요...</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Home
