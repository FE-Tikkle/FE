import React, { useState } from 'react'
import Modal from './modal'
import { motion } from 'framer-motion'
import './Mypage.css'
import Profile from './Mypage/Profile'
import Announcement from './Mypage/announcement'
import Help from './Mypage/help'
import Recommend from './Mypage/recommend'
import Service from './Mypage/service'
import Logout from './Mypage/logout'
import Getout from './Mypage/getout'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
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

const LoginModal2: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('프로필 및 계정')

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  const renderContent = () => {
    switch (selectedOption) {
      case '프로필 및 계정':
        return <Profile />
      case '공지사항':
        return <Announcement />
      case '고객센터 / 도움말':
        return <Help />
      case '친구에게 추천하기':
        return <Recommend />
      case '서비스 약관':
        return <Service />
      case '로그아웃':
        return <Logout />
      case '서비스 탈퇴':
        return <Getout />
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="Mypage2-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <img src="img/Mypage/LoginTake.svg" className="LoginTake"></img>
      </motion.div>
    </Modal>
  )
}

export default LoginModal2
