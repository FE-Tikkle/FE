import React, { useState, useEffect } from 'react'
import './Header.css'
import AuthHandler from '../Login/AuthHandler'

const Header: React.FC = () => {
  const [isAuthTokenPresent, setIsAuthTokenPresent] = useState(false)
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      setIsAuthTokenPresent(true)
      console.log(accessToken)
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
        <div>마이페이지</div>
        <div className="Header-profile">
          <div className="Header-profile-img" />
          {!isAuthTokenPresent && <AuthHandler />}
        </div>
      </div>
    </header>
  )
}

export default Header
