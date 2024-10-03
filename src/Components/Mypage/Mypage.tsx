import React, { useState, useEffect } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Mypage.css'
import History from './History/History'
import Myschool from './Myschool/Myschool'
import Recruit from './Recruit/Recruit'
import Activites from './Activites/Activites'
import Contest from './Contest/Contest'
import Mypageinfo from '../modal/Mypageinfomodal'
import DoLogin from './DoLogin'
import LoginModal2 from '../modal/Loginmodal2'
import { getUserData, UserData } from '../../api'
import { toast } from 'react-toastify'

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
    mainText: '히스토리',
    title: '히스토리',
    content: History,
  },
  {
    num: '02',
    mainText: '우리학교',
    title: '우리학교',
    content: Myschool,
  },
  {
    num: '03',
    mainText: '채용공고',
    title: '채용공고',
    content: Recruit,
  },
  {
    num: '04',
    mainText: '대외활동',
    title: '대외활동',
    content: Activites,
  },
  {
    num: '05',
    mainText: '공모전',
    title: '공모전',
    content: Contest,
  },
]
const MyPageModal: React.FC<MyPageModalProps> = ({
  isOpen,
  onClose,
  initialSelectedIndex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    if (initialSelectedIndex !== undefined) {
      setSelectedIndex(initialSelectedIndex)
    }
    checkLoginStatus()
  }, [initialSelectedIndex])
  const checkLoginStatus = () => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }
  const selectedData =
    selectedIndex !== null
      ? selecterData[selectedIndex]
      : { title: '', content: null }
  const SelectedComponent = selectedData.content || null
  const renderContent = () => {
    if (selectedIndex === 0) {
      // 티끌 소개 선택 시
      return SelectedComponent && <SelectedComponent onClose={onClose} />
    } else {
      // 다른 컨텐츠 선택 시
      if (isLoggedIn) {
        // 로그인한 경우
        return SelectedComponent && <SelectedComponent onClose={onClose} />
      } else {
        // 로그인하지 않은 경우
        return <DoLogin />
      }
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const handleLogin = () => {
    openLoginModal()
  }
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('is_new')
    localStorage.removeItem('refresh_token')
    setIsLoggedIn(false)
    onClose()
    window.location.reload()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="mypage-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <div className='MyPage-title'>마이페이지</div>
          <div className="MyPage-All">
            <div className="MyPage-left">
              <div className="Mypage-Profile">
                <div className="Mypage-profile-first">
                  <div className="Mypage-Profile-img">
                    <img src="img/Mypage/Proile.svg"></img>
                  </div>
                  <div className="Mypage-Profile-name">
                    {userData ? (
                      <p>{userData.name}님</p>
                    ) : (
                      <p>로그인이 필요해요!</p>
                    )}
                  </div>
                </div>
                <div className="Mypage-Profile-info">
                <div className="Mypage-Profile-buttons">
                  <div
                    className="Mypage-Profile-button"
                    onClick={isLoggedIn ? openModal : handleLogin}
                  >
                    설정
                  </div>
                  <div
                    className="Mypage-Profile-button"
                    onClick={isLoggedIn ? handleLogout : handleLogin} // 로그인 상태에 따라 호출되는 함수 변경
                  >
                    {isLoggedIn ? '로그아웃' : '로그인하기'}
                  </div>
                </div> 
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
                      {/* <div className="Mypage-Selecter-secondText">
                        {item.secondText}
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="MyPage-right">
              {/* <div className="MyPage-Title">{selectedData.title}</div> */}
              <div className="MyPage-Content">{renderContent()}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Mypageinfo isOpen={isModalOpen} onClose={closeModal} />
      <LoginModal2 isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </Modal>
  )
}

export default MyPageModal
