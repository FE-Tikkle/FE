import { useState, ChangeEvent, KeyboardEvent } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Searchbar.css'
import '../../App.css'
interface Platform {
  name: string
  url: string
  imgSrc?: string
}

const initialPlatforms: Platform[] = [
  {
    name: 'Notion',
    url: 'https://www.notion.com',
    imgSrc: 'img/Logo/notion.svg',
  },
  { name: 'GPT-4', url: 'https://chatgpt.com/', imgSrc: 'img/Logo/gpt.svg' },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com',
    imgSrc: 'img/Logo/youtube.svg',
  },
]

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [platforms, setPlatforms] = useState(initialPlatforms)
  const [newPlatformName, setNewPlatformName] = useState('')
  const [newPlatformUrl, setNewPlatformUrl] = useState('')
  const [showAddPlatformModal, setShowAddPlatformModal] = useState(false)

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

  const handleAddPlatform = () => {
    if (!newPlatformName || !newPlatformUrl) {
      alert('이름과 URL을 모두 입력해주세요.')
      return
    }
    if (newPlatformName && newPlatformUrl) {
      const newPlatform = { name: newPlatformName, url: newPlatformUrl }
      setPlatforms([...platforms, newPlatform])
      setNewPlatformName('')
      setNewPlatformUrl('')
      setShowAddPlatformModal(false)
    }
  }
  const handleDeletePlatform = (url: string) => {
    const filteredPlatforms = platforms.filter(platform => platform.url !== url)
    setPlatforms(filteredPlatforms)
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
              <img
                src="img/delete.svg"
                alt="삭제"
                onClick={() => handleDeletePlatform(platform.url)}
              />
            </button>
          </div>
        ))}
        {platforms.length < 6 && (
          <button
            className="Search-Each-button_add"
            onClick={() => setShowAddPlatformModal(true)}
          >
            {' '}
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
