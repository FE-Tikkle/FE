import React, { useState } from 'react'
import './notice.css'
import { toggleBookmark } from '../../../api'

interface Notice {
  id: string
  department: string
  title: string
  date: string
  is_bookmarked: boolean
}

interface NoticeProps {
  notice: Notice
  onBookmarkUpdate?: (id: string, newStatus: boolean) => void
}

const Notice: React.FC<NoticeProps> = ({ notice, onBookmarkUpdate }) => {
  const [isBookmarked, setIsBookmarked] = useState(notice.is_bookmarked)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleBookmarkClick = async () => {
    if (isUpdating) return

    setIsUpdating(true)
    try {
      const newBookmarkStatus = await toggleBookmark(notice.id)
      setIsBookmarked(!isBookmarked)
      if (onBookmarkUpdate) {
        onBookmarkUpdate(notice.id, newBookmarkStatus)
      }
    } catch (error) {
      console.error('Failed to update bookmark status:', error)
      // 에러 처리: 사용자에게 알림을 표시하거나 다른 적절한 처리를 수행
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="notice">
      <span className="department">{notice.department}</span>
      <span className="title">{notice.title}</span>
      <span className="date">{notice.date}</span>
      <img
        src={isBookmarked ? 'img/Star.svg' : 'img/Star-none.svg'}
        alt="Bookmark"
        className={`bookmark-icon ${isUpdating ? 'updating' : ''}`}
        onClick={handleBookmarkClick}
      />
    </div>
  )
}

export default Notice
