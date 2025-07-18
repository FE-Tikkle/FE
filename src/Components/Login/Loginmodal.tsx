import React, { useState, useEffect } from 'react'
import Modal from '../Modal/modal'
import { motion } from 'framer-motion'
import './Login.css'
import DataListener from './DataListener'
import { getStorageData } from '../../util/storage'
interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onKakaoLogin: () => void
  onNaverLogin: () => void
  onGoogleLogin: () => void
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
  onGoogleLogin,
}) => {
  const [imageSrc, setImageSrc] = React.useState('img/Login/data1.png');
  const [lastLoginType, setLastLoginType] = useState<string | null>(null);

  React.useEffect(() => {
    // PNG 이미지 미리 로드
    const pngImage = new Image();
    pngImage.src = 'img/Login/data1.png';

    // SVG 이미지 미리 로드
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'img/Login/data1.svg';
    document.head.appendChild(link);

    const svgImage = new Image();
    svgImage.src = 'img/Login/data1.svg';
    svgImage.onload = () => {
      setImageSrc('img/Login/data1.svg');
    };

    // 클린업 함수
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const getLoginType = async () => {
      const loginType = await getStorageData('last_login_type');
      setLastLoginType(loginType);
    };
    getLoginType();
  }, []);

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
        <motion.div variants={item}>
          <div className="Login-left">
            <div className="Login-maintext">
              <div className="Login-maintext-3">티끌은</div>
              <div className="Login-maintext-1">
                <div>
                  <span>작은 정보</span>를 모아
                </div>
                <span>큰 가치</span>를 만들어냅니다.
              </div>
              <div className="Login-maintext-2">
                <div>취업, 대외활동, 공모전을</div> 확인하여 당신의 잠재력을
                펼쳐보세요
              </div>
            </div>
            <img src={imageSrc} alt="모래성 이미지" />
          </div>
        </motion.div>
        <div className="Login-right">
          <motion.div variants={item}>
            <div className="Login-rightText">
              <div className="Login-rightText-Title">로그인</div>
              <div className="Login-rightText-EX">
                <div>SNS로 간편하게 로그인하고 더 많은</div>
                <div>서비스를 즐겨보세요!</div>
              </div>
            </div>
          </motion.div>
          <div className="Login-social-button">
            <motion.div variants={item} onClick={onGoogleLogin} className="login-button-wrapper">
              <div className="Login-google">구글 로그인</div>
              {lastLoginType === 'google' && (
                <span className="last-login-badge">최근 로그인</span>
              )}
            </motion.div>
            <motion.div variants={item} onClick={onNaverLogin} className="login-button-wrapper">
              <div className="Login-naver">네이버 로그인</div>
              {lastLoginType === 'naver' && (
                <span className="last-login-badge">최근 로그인</span>
              )}
            </motion.div>
            <motion.div variants={item} onClick={onKakaoLogin} className="login-button-wrapper">
              <div className="Login-kakao">카카오 로그인</div>
              {lastLoginType === 'kakao' && (
                <span className="last-login-badge">최근 로그인</span>
              )}
            </motion.div>
          </div>
        </div>
        <DataListener onReceiveAuthData={receiveAuthData} />
      </motion.div>
    </Modal>
  )
}

export default LoginModal
