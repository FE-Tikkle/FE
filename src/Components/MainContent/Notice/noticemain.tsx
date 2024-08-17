// Noticemain.tsx
import React, { useState, useEffect } from 'react'
import Notice from './notice'
import { getNoticeFiltered, NoticeData } from '../../../api'

interface NoticemainProps {
  activeTab: string
}

const Noticemain: React.FC<NoticemainProps> = ({ activeTab }) => {
  const [notices, setNotices] = useState<NoticeData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log(activeTab)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNoticeFiltered(10, 1, activeTab, '')
        setNotices(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching notices:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <div className="notice-all-container">
      {isLoading ? (
        <p>로딩 중...</p>
      ) : notices.length > 0 ? (
        notices.map((notice, index) => <Notice key={index} notice={notice} />)
      ) : (
        <p>공지사항이 없습니다.</p>
      )}
    </div>
  )
}

export default Noticemain
