import React from 'react'
import './Login.css'
interface LoginButtonProps {
  onClick: () => void
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <div className="Login-button" onClick={onClick}>
      로그인하기
    </div>
  )
}

export default LoginButton
