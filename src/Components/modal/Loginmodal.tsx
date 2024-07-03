import React from 'react'
import Modal from './modal'
import { motion } from 'framer-motion'
import './modal.css'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { postsign } from '../../api'
import DataListener from '../Login/DataListener'
interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onKakaoLogin: () => void
  onNaverLogin: () => void
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onKakaoLogin,
  onNaverLogin,
}) => {
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      console.log(credentialResponse.credential)
      postsign(credentialResponse.credential, 'google')
    } else {
      console.error('No credential found in the response.')
    }
  }

  const handleGoogleError = () => {
    console.error('Failed Login..')
  }
  const receiveAuthData = (authData: any) => {
    console.log('Received auth data in Home component:', authData)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="login-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={item}>로그인</motion.h2>
        <motion.p variants={item}>로그인 폼이 여기에 들어갑니다.</motion.p>
        <motion.button variants={item} onClick={onKakaoLogin}>
          카카오 로그인
        </motion.button>
        <motion.button variants={item} onClick={onNaverLogin}>
          네이버 로그인
        </motion.button>
        <motion.div className="google-login-container" variants={item}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            type="icon"
            useOneTap
          />
        </motion.div>
        <DataListener onReceiveAuthData={receiveAuthData} />
      </motion.div>
    </Modal>
  )
}

export default LoginModal
