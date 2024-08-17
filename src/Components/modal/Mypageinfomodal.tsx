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

const Mypageinfo: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
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
        className="Mypage-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="Mypage-modal-title">
          설정
        </motion.div>
        <motion.div className="Mypage-modal-Content">
          <motion.div variants={item} className="Mypage-modal-left">
            <div className="Mypage-modal-selecter">
              {[
                '프로필 및 계정',
                '공지사항',
                '고객센터 / 도움말',
                '친구에게 추천하기',
                '서비스 약관',
                '서비스 탈퇴',
              ].map(option => (
                <div
                  key={option}
                  className={`Mypage-modal-select ${
                    selectedOption === option ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <img
                    src={`img/Mypage/Vector${
                      option === '프로필 및 계정'
                        ? ''
                        : option === '공지사항'
                        ? '2'
                        : option === '고객센터 / 도움말'
                        ? '3'
                        : option === '친구에게 추천하기'
                        ? '4'
                        : option === '서비스 약관'
                        ? '5'
                        : '7'
                    }.svg`}
                  />
                  <div className="Mypage-modal-select-text">{option}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={item} className="Mypage-modal-right">
            {renderContent()}
          </motion.div>
        </motion.div>
      </motion.div>
    </Modal>
  )
}

export default Mypageinfo
