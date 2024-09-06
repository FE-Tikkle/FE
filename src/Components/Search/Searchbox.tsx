import React, { useState, KeyboardEvent } from 'react'
import './Searchbar.css'
interface SearchBoxProps {
  onSearch: (searchTerm: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = () => {
    onSearch(searchTerm)
    console.log(searchTerm)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="SearchBoxConatiner">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onKeyPress={handleKeyPress}
        className="SearchBoxInput"
      />
      <div onClick={handleSearch} className="SearchBoxicon">
        <img src="img/SearchBOX.svg" alt="검색" />
      </div>
    </div>
  )
}

export default SearchBox
