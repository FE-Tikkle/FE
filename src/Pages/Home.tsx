import React, { useState, useEffect } from 'react'
import Header from '../Components/Header/Header'
import Loading from '../Components/Loading'
import Footer from '../Components/Footer/Footer'
import AuthHandler from '../Components/Login/AuthHandler'
import Search from '../Components/Search/Searchbar'
import Main from '../Components/Main/main'
import { getUserData, UserData } from '../api' 
import * as Sentry from '@sentry/react'
import { getStorageData } from '../util/storage'

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        Sentry.captureException(error)
        console.error('Failed to fetch user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const checkModalVisibility = async () => {
      // 로그인 상태 확인
      const accessToken = await getStorageData('access_token')
      if (!accessToken) return
      
      // // 저장된 날짜 확인
      // const savedDate = await getStorageData('reviewModalHideDate')
      // const today = new Date().toDateString()
      
      // // 저장된 날짜가 오늘과 다르면 모달 표시
      // setShowModal(savedDate !== today)
    }
    
    checkModalVisibility()
  }, [])

  const params = new URLSearchParams(location.search)
  const code = params.get('code')

  // 모달 닫기 함수
  // const closeModal = () => {
  //   setShowModal(false)
  // }
  
  // 오늘 하루 보지 않기 함수도 비동기로 수정
  // const hideModalForToday = async () => {
  //   setShowModal(false)
  //   // 로컬 스토리지에 오늘 날짜 저장
  //   await setStorageData('reviewModalHideDate', new Date().toDateString())
  // }

  if (code) {
    return (
      <div>
        <Loading />
        <AuthHandler />
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Header userData={userData} />
      <Search userData={userData} />
      {/* <ThemeSelector/> */}
      <Main userData={userData} />
      <Footer />
      {/* {showModal && <ReviewEventModal onClose={closeModal} onHideToday={hideModalForToday} />} */}
    </div>
  )
}

export default Home
