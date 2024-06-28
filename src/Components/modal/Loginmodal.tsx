// LoginModal.tsx
import React from 'react'
import Modal from './modal'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onKakaoLogin: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onKakaoLogin,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>로그인</h2>
      <p>로그인 폼이 여기에 들어갑니다.</p>
      <button onClick={onKakaoLogin}>카카오 로그인</button>
    </Modal>
  )
}

export default LoginModal
