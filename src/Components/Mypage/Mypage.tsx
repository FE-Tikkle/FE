import React, { useState, useEffect } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Mypage.css'

interface MyPageModalProps {
  isOpen: boolean
  onClose: () => void
  initialSelectedIndex?: number
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

const selecterData = [
  {
    num: '01',
    mainText: '티끌 소개',
    secondText: '티끌에 대해 알아봐요',
    title: '티끌 소개',
    content: 'dd',
  },
  {
    num: '02',
    mainText: '히스토리',
    secondText: '나의 북마크를 확인해요',
    title: '히스토리',
  },
  {
    num: '03',
    mainText: '우리학교',
    secondText: '나의 학력사항을 수정해요',
    title: '우리학교',
  },
  {
    num: '04',
    mainText: '채용공고',
    secondText: '관심있는 취업분야를 선택해요',
    title: '채용공고',
  },
  {
    num: '05',
    mainText: '대외활동',
    secondText: '관심있는 활동분야를 선택해요',
    title: '대외활동',
  },
  {
    num: '06',
    mainText: '공모전',
    secondText: '관심있는 공모전을 선택해요',
    title: '공모전',
  },
]
const MyPageModal: React.FC<MyPageModalProps> = ({
  isOpen,
  onClose,
  initialSelectedIndex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  useEffect(() => {
    if (initialSelectedIndex !== undefined) {
      setSelectedIndex(initialSelectedIndex)
    }
  }, [initialSelectedIndex])

  const selectedData =
    selectedIndex !== null
      ? selecterData[selectedIndex]
      : { title: '', content: null }
  const SelectedComponent = selectedData.content || null

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
                {selecterData.map((item, index) => (
                  <div
                    className={`Mypage-Selecter ${
                      selectedIndex === index ? 'selected' : ''
                    }`}
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="Mypage-Selecter-num">{item.num}</div>
                    <div className="Mypage-Selecter-texts">
                      <div className="Mypage-Selecter-mainText">
                        {item.mainText}
                      </div>
                      <div className="Mypage-Selecter-secondText">
                        {item.secondText}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="MyPage-right">
              <div className="MyPage-Title">{selectedData.title}</div>
              <div className="MyPage-Content">
                {' '}
                {SelectedComponent && <SelectedComponent />}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Modal>
  )
}

export default MyPageModal
