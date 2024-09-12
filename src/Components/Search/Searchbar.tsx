import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
// import axios from 'axios'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Searchbar.css'
import '../../App.css'
import axiosInstance, { UserData } from '../../api'

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
      const userPlatforms = (userData.bookmarked_link as unknown as BookmarkedLink[]).map(
        link => ({
          name: link.title,
          url: link.uri.startsWith('http') ? link.uri : `https://${link.uri}`,
          state: link.state,
        })
      )
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
      const response = await axiosInstance.post(API_URL, bookmark)
      if (response.status === 200) {
        console.log('북마크 업데이트 성공')
      } else {
        throw new Error('북마크 업데이트 실패')
      }
    } catch (error) {
      console.error('북마크 업데이트 중 오류 발생:', error)
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
      alert('북마크 추가에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleDeletePlatform = async (url: string) => {
    const platformToDelete = platforms.find(platform => platform.url === url)
    if (!platformToDelete) return

    try {
      await updateBookmark({
        uri: platformToDelete.url,
        title: platformToDelete.name,
        state: false,
      })

      const filteredPlatforms = platforms.filter(
        platform => platform.url !== url
      )
      setPlatforms(filteredPlatforms)
    } catch (error) {
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
                  `https://www.google.com/s2/favicons?domain=${platform.url}`
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
    </div>
  )
}

export default Searchbar
