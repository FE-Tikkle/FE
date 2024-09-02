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
  searchTerm: string
}

const Noticemain: React.FC<NoticemainProps> = ({
  activeTab,
  onTagListUpdate,
  searchTerm,
}) => {
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<JSX.Element | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const prevActiveTabRef = useRef<string>('')
  const prevSearchTermRef = useRef<string>('')
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)
  const prevPageRef = useRef<number>(1)

  const ITEMS_PER_PAGE = 20
  const MAX_PAGES = 50 // 최대 페이지 수 설정

  const fetchNotices = useCallback(async () => {
    if (
      (activeTab === prevActiveTabRef.current &&
        page === prevPageRef.current &&
        searchTerm === prevSearchTermRef.current) ||
      !hasMore ||
      page > MAX_PAGES // 최대 페이지 수 체크
    )
      return

    setIsLoading(true)
    setError(null)
    try {
      const response: NoticeResponse = await getNoticeFiltered(
        ITEMS_PER_PAGE,
        page,
        activeTab,
        searchTerm
      )

      if (response.data.length === 0 || response.data.length < ITEMS_PER_PAGE) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }

      if (page === 1) {
        setNotices(response.data)
      } else {
        setNotices(prevNotices => [...prevNotices, ...response.data])
      }

      if (response.tagList) {
        onTagListUpdate(response.tagList)
      }
      prevActiveTabRef.current = activeTab
      prevPageRef.current = page
      prevSearchTermRef.current = searchTerm
    } catch (err) {
      setError(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="img/Mypage/DoLogin.svg"
            alt="Error"
            style={{ width: '500px' }}
          />
        </div>
      )
      console.error('Error fetching notices:', err)
    } finally {
      setIsLoading(false)
    }
  }, [activeTab, onTagListUpdate, page, searchTerm, hasMore])

  useEffect(() => {
    if (
      prevActiveTabRef.current !== activeTab ||
      prevSearchTermRef.current !== searchTerm
    ) {
      setNotices([])
      setPage(1)
      prevPageRef.current = 1
      setHasMore(true)
    }
    fetchNotices()
  }, [activeTab, fetchNotices, searchTerm])

  const handleScroll = () => {
    if (!containerRef.current || isLoading || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPage(prevPage => prevPage + 1)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerRef, isLoading, hasMore])

  if (isLoading && notices.length === 0) {
    return <p>로딩 중...</p>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="notice-all-container" ref={containerRef}>
      {notices.length > 0 ? (
        notices.map((notice, index) => <Notice key={index} notice={notice} />)
      ) : (
        <p>공지사항이 없습니다.</p>
      )}
      {isLoading && <p>더 많은 공지사항을 불러오는 중...</p>}
      {!isLoading && !hasMore && notices.length > 0 && (
        <p>모든 공지사항을 불러왔습니다.</p>
      )}
    </div>
  )
}

export default Noticemain
