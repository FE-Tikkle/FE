import React, { useState, ChangeEvent } from 'react'
import './Searchbar.css'
interface Platform {
  name: string
  url: string
}

const platforms: Platform[] = [
  { name: 'Google', url: 'https://www.google.com/search?q=' },
  { name: 'Naver', url: 'https://www.naver.com/search?q=' },
  { name: 'Youtube', url: 'https://www.youtube.com/?search_query=' },

  //플랫폼 입력하기
]
const Searchbar: React.FC = () => {
  const [searchTerm, setsearchTerm] = useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    platforms[0]
  )

  const handlesearch = (): void => {
    if (searchTerm.trim() !== ' ') {
      const searchUrl: string =
        selectedPlatform.url + encodeURIComponent(searchTerm)
      window.open(searchUrl, '_blank')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setsearchTerm(e.target.value)
  }

  const handlePlatformClick = (platform: Platform): void => {
    setSelectedPlatform(platform)
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
          alt="Searchimg"
          src="img/search-line.png"
          onClick={handlesearch}
        />
      </div>
      <div className="Search-buttons">
        {platforms.map(platform => (
          <button
            key={platform.name}
            onClick={() => handlePlatformClick(platform)}
            className="Search-Each-button"
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Searchbar
