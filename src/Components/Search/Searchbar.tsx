import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Searchbar.css'
import '../../App.css'
import axiosInstance, { UserData } from '../../api'
import * as Sentry from '@sentry/react';
import Bell from './Bell';
interface Platform {
  name: string
  url: string
  imgSrc?: string
  state: boolean
}

interface SearchbarProps {
  userData: UserData | null
}

interface BookmarkedLink {
  uri: string
  title: string
  state: boolean
}

interface BookmarkUpdate {
  uri: string
  title: string
  state: boolean
}

const API_URL = 'https://api.tikkeul.site/user/bookmark' // API URL을 적절히 변경해주세요

const Searchbar: React.FC<SearchbarProps> = ({ userData }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [newPlatformName, setNewPlatformName] = useState('')
  const [newPlatformUrl, setNewPlatformUrl] = useState('')
  const [showAddPlatformModal, setShowAddPlatformModal] = useState(false)

  useEffect(() => {
    if (userData && Array.isArray(userData.bookmarked_link)) {
      console.log('원본 북마크 데이터:', userData.bookmarked_link)

      const userPlatforms = (userData.bookmarked_link as BookmarkedLink[]).map(
        link => {
          console.log('변환 전 링크 데이터:', link)
          
          return {
            name: link.title,
            url: link.uri.startsWith('http') ? link.uri : `https://${link.uri}`,
            state: true
          }
        }
      )
      console.log('변환된 플랫폼 데이터:', userPlatforms)
      setPlatforms(userPlatforms)
    }
  }, [userData])

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchTerm
      )}`
      window.open(searchUrl, '_blank')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const updateBookmark = async (bookmark: BookmarkUpdate) => {
    try {
      console.log('북마크 업데이트 요청:', bookmark)
      
      const response = await axiosInstance.post(API_URL, {
        uri: bookmark.uri,
        title: bookmark.title,
        state: bookmark.state
      })
      
      console.log('북마크 업데이트 성공:', response.data)
      return response
    } catch (error: any) {
      if (error.response?.status === 409) {
        console.log('409 에러 상세 정보:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          message: error.message
        })
      
        return { 
          status: 409, 
          data: error.response.data 
        }
      }
      console.error('북마크 업데이트 실패:', error.response?.data || error.message)
      Sentry.captureException(error)
      throw error
    }
  }

  const handleAddPlatform = async () => {
    if (!newPlatformName || !newPlatformUrl) {
      alert('이름과 URL을 모두 입력해주세요.')
      return
    }
    const newPlatform: Platform = {
      name: newPlatformName,
      url: newPlatformUrl.startsWith('http')
        ? newPlatformUrl
        : `https://${newPlatformUrl}`,
      state: true,
    }

    try {
      await updateBookmark({
        uri: newPlatform.url,
        title: newPlatform.name,
        state: true,
      })

      setPlatforms([...platforms, newPlatform])
      setNewPlatformName('')
      setNewPlatformUrl('')
      setShowAddPlatformModal(false)
    } catch (error) {
      Sentry.captureException(error);
      alert('북마크 추가에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleDeletePlatform = async (url: string) => {
    try {
      const platformToDelete = platforms.find(platform => platform.url === url)
      if (!platformToDelete) {
        console.log('삭제할 북마크를 찾을 수 없습니다:', url)
        return
      }

      console.log('삭제할 북마크:', platformToDelete)

      const result = await updateBookmark({
        uri: platformToDelete.url,
        title: platformToDelete.name,
        state: false
      })

      if (result?.status === 200) {
        setPlatforms(prevPlatforms => 
          prevPlatforms.filter(platform => platform.url !== url)
        )
        console.log('북마크 삭제 완료')
      }
    } catch (error) {
      console.error('북마크 삭제 실패:', error)
      Sentry.captureException(error)
      alert('북마크 삭제에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="Search-main">
      <div className="Search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="검색어를 입력해주세요."
          className="Search-bar"
          onKeyDown={handleKeyPress}
        />
        <img
          className="Search-img"
          alt="Search icon"
          src="img/Logo/searchiocn2.svg"
          onClick={handleSearch}
        />
      </div>
      <div className="Search-buttons">
        {platforms.map(platform => (
          <div key={platform.url} className="Search-Each-button-container">
            <button
              onClick={() => window.open(platform.url, '_blank')}
              className="Search-Each-button"
            >
              <img
                src={
                  platform.imgSrc ||
                  `https://www.google.com/s2/favicons?domain=${platform.url}&sz=128`
                }
                alt={`${platform.name} logo`}
                className={platform.imgSrc ? 'Platform-icon' : 'Favicon-icon'}
              />
              {platform.name}
            </button>
            <button
              className="Delete-button"
              onClick={() => handleDeletePlatform(platform.url)}
            >
              <img src="img/delete.svg" alt="삭제" />
            </button>
          </div>
        ))}
        {platforms.length < 6 && (
          <button
            className="Search-Each-button_add"
            onClick={() => setShowAddPlatformModal(true)}
          >
            <img src="img/Logo/Vector.svg" alt="add_button" />
          </button>
        )}
      </div>
      <Modal
        isOpen={showAddPlatformModal}
        onClose={() => setShowAddPlatformModal(false)}
        customCloseButton={
          <motion.button
            className="custom-close-button"
            onClick={() => setShowAddPlatformModal(false)}
          >
            취소
          </motion.button>
        }
      >
        <div className="Add-platform-form">
          <div className="Add-plaform-maintxt">바로가기 추가</div>
          <div className="Search-new-platform">
            <label>이름</label>
            <input
              type="text"
              placeholder="새 플랫폼 이름"
              value={newPlatformName}
              onChange={e => setNewPlatformName(e.target.value)}
              className="Search-new-platform-name"
            />
          </div>
          <div className="Search-new-platform">
            <label>URL</label>
            <input
              type="text"
              placeholder="새 플랫폼 URL"
              value={newPlatformUrl}
              onChange={e => setNewPlatformUrl(e.target.value)}
              className="Search-new-platform-URL"
            />
          </div>
          <button
            className="Search-newplatfrom-sumbit"
            onClick={handleAddPlatform}
          >
            저장
          </button>
        </div>
      </Modal>
      <div className='Search-Notice'>
        <Bell/>
      </div>
    </div>
  )
}

export default Searchbar
