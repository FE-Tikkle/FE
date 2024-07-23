import React from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Mypage.css'

interface MyPageModalProps {
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

const MyPageModal: React.FC<MyPageModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="mypage-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <div className="MyPage-All">
            <div className="MyPage-left">
              <div className="Mypage-Profile">
                <div className="Mypage-Profile-img"></div>
                <div className="Mypage-Profile-name">눈멍이 님</div>
                <div className="Mypage-Profile-buttons">
                  <div className="Mypage-Profile-button">설정</div>
                  <div className="Mypage-Profile-button">프로필 수정</div>
                </div>
              </div>
              <div className="Mypage-Select">
                <div className="Mypage-Selecter">
                  <div className="Mypage-Selecter-num">01</div>
                  <div className="Mypage-Selecter-texts">
                    <div className="Mypage-Selecter-mainText">티끌 소개</div>
                    <div className="Mypage-Selecter-secondText">
                      티끌에 대해 알아봐요
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="MyPage-right">
              <div className="MyPage-Title">티끌 소개</div>
              <div className="MyPage-Content"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Modal>
  )
}

export default MyPageModal
