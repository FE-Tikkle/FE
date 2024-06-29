import React from 'react'

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>로그인하기</button>
}

export default LoginButton
