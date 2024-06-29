import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { kakaoLogin } from '../store/slices/authslice'
import LoginModal from '../Components/modal/Loginmodal'
import { postsign } from '../api'
import Loading from '../Components/Loading'
import LoginButton from '../Components/Login/Loginbutton'
import DataListener from '../Components/Login/DataListener'
import InfoModal from '../Components/modal/infomodal'
const Home: React.FC = () => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [inNew, setInNew] = useState(false)
  const [formData, setFormData] = useState({})
  useEffect(() => {
    // 로컬 스토리지에서 in_new 값 확인하여 설정
    const inNewValue = localStorage.getItem('is_new') === 'true'
    setInNew(inNewValue)
    openInfoModal()
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openInfoModal = () => {
    setIsInfoModalOpen(true)
  }

  const closeInfoModal = () => {
    setIsInfoModalOpen(false)
  }
  useEffect(() => {
    if (code) {
      postsign(code, 'kakao')
    }
  }, [code])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    // localStorage.setItem('is_new', 'false') -> post하면 하는걸로 변경하기
    console.log('Form Data:', formData)
    closeInfoModal()
  }
  const handleKakaoLogin = () => {
    dispatch(kakaoLogin())
    closeModal()
  }
  const receiveAuthData = (authData: any) => {
    console.log('Received auth data in Home component:', authData)
  }
  return (
    <div>
      <DataListener onReceiveAuthData={receiveAuthData} />
      {code ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <h2>홈 페이지</h2>
          <LoginButton onClick={openModal} />
          <LoginModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onKakaoLogin={handleKakaoLogin}
          />
          {inNew && (
            <InfoModal
              isOpen={isInfoModalOpen}
              onClose={closeInfoModal}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Home
