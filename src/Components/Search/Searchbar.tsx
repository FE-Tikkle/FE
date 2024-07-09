import { useState, ChangeEvent } from 'react'
import Modal from '../modal/modal' // 모달 컴포넌트 임포트
import './Searchbar.css'

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
      const searchUrl = `${platforms[0].url}/search?q=${encodeURIComponent(
        searchTerm
      )}`
      window.open(searchUrl, '_blank')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const handleAddPlatform = () => {
    if (newPlatformName && newPlatformUrl) {
      const newPlatform = { name: newPlatformName, url: newPlatformUrl }
      setPlatforms([...platforms, newPlatform])
      setNewPlatformName('')
      setNewPlatformUrl('')
      setShowAddPlatformModal(false)
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
        />
        <img
          className="Search-img"
          alt="Search icon"
          src="img/Searchicon.png"
          onClick={handleSearch}
        />
      </div>
      <div className="Search-buttons">
        {platforms.map(platform => (
          <button
            key={platform.url}
            onClick={() => window.open(platform.url, '_blank')}
            className="Search-Each-button"
          >
            <img
              src={
                platform.imgSrc ||
                `https://www.google.com/s2/favicons?domain=${platform.url}`
              }
              alt={`${platform.name} logo`}
              className="Platform-icon"
            />
            {platform.name}
          </button>
        ))}
        <button
          className="Search-Each-button_add"
          onClick={() => setShowAddPlatformModal(true)}
        >
          {' '}
          <img src="img/Logo/Vector.svg" alt="add_button" />
          바로가기 추가
        </button>
      </div>
      <Modal
        isOpen={showAddPlatformModal}
        onClose={() => setShowAddPlatformModal(false)}
      >
        <div className="Add-platform-form">
          <input
            type="text"
            placeholder="새 플랫폼 명"
            value={newPlatformName}
            onChange={e => setNewPlatformName(e.target.value)}
          />
          <input
            type="text"
            placeholder="새 플랫폼 URL"
            value={newPlatformUrl}
            onChange={e => setNewPlatformUrl(e.target.value)}
          />
          <button onClick={handleAddPlatform}>플랫폼 추가</button>
        </div>
      </Modal>
    </div>
  )
}

export default Searchbar
