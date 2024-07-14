import React, { useState } from 'react'
import './notice.css'

interface NoticeProps {
  notice: {
    department: string
    title: string
    date: string
  }
}

const Notice: React.FC<NoticeProps> = ({ notice }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="notice">
      <span className="department">{notice.department}</span>
      <span className="title">{notice.title}</span>
      <span className="date">{notice.date}</span>
      <img
        src={isBookmarked ? 'img/Star-none.svg' : 'img/Star.svg'}
        alt="Bookmark"
        className="bookmark-icon"
        onClick={handleBookmarkClick}
      />
    </div>
  )
}

export default Notice
