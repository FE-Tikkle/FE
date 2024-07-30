import React, { useState, useEffect } from 'react'
import './Header.css'
import AuthHandler from '../Login/AuthHandler'
import MyPageModal from '../Mypage/Mypage'

const Header: React.FC = () => {
  const [isAuthTokenPresent, setIsAuthTokenPresent] = useState(false)
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      setIsAuthTokenPresent(true)
      console.log(accessToken)
      console.log(isAuthTokenPresent)
    }
  }, [])
  return (
    <header className="Header-main">
      <div className="Header-left">
        <div className="Header-text" onClick={handleClick}>
          티끌
        </div>
      </div>
      <div className="Header-right">
        <div>티끌 소개</div>
        <div className="Header-mypage" onClick={openModal}>
          마이페이지
        </div>
        <div className="Header-profile">
          <div className="Header-profile-img" />
          <AuthHandler />
        </div>
      </div>
      <MyPageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialSelectedIndex={1}
      />
    </header>
  )
}

export default Header
