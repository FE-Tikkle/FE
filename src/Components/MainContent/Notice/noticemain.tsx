import React, { useState, useEffect, useRef, useCallback } from 'react'
import Notice from './notice'
import {
  getNoticeFiltered,
  NoticeResponse,
  Notice as NoticeType,
} from '../../../api'

interface NoticemainProps {
  activeTab: string
  onTagListUpdate: (tagList: string[]) => void
}

const Noticemain: React.FC<NoticemainProps> = ({
  activeTab,
  onTagListUpdate,
}) => {
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const prevActiveTabRef = useRef<string>('')

  const fetchNotices = useCallback(async () => {
    if (activeTab === prevActiveTabRef.current) return

    setIsLoading(true)
    setError(null)
    try {
      const response: NoticeResponse = await getNoticeFiltered(
        10,
        1,
        activeTab,
        ''
      )
      setNotices(response.data)
      if (response.tagList) {
        onTagListUpdate(response.tagList)
      }
      prevActiveTabRef.current = activeTab
    } catch (err) {
      setError('공지사항을 불러오는 데 실패했습니다.')
      console.error('Error fetching notices:', err)
    } finally {
      setIsLoading(false)
    }
  }, [activeTab, onTagListUpdate])

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  if (isLoading) {
    return <p>로딩 중...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="notice-all-container">
      {notices.length > 0 ? (
        notices.map((notice, index) => <Notice key={index} notice={notice} />)
      ) : (
        <p>공지사항이 없습니다.</p>
      )}
    </div>
  )
}

export default Noticemain
