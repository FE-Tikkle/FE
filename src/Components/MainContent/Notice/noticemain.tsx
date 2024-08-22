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
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true) // 추가: 더 많은 데이터가 있는지 여부
  const prevActiveTabRef = useRef<string>('')
  const prevSearchTermRef = useRef<string>('')
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)
  const prevPageRef = useRef<number>(1)

  const fetchNotices = useCallback(async () => {
    if (
      (activeTab === prevActiveTabRef.current &&
        page === prevPageRef.current &&
        searchTerm === prevSearchTermRef.current) ||
      !hasMore // 추가: 더 이상 데이터가 없으면 API 호출 중단
    )
      return

    setIsLoading(true)
    setError(null)
    try {
      const response: NoticeResponse = await getNoticeFiltered(
        20,
        page,
        activeTab,
        searchTerm
      )

      if (response.data.length === 0) {
        setHasMore(false) // 데이터가 더 이상 없으면 hasMore를 false로 설정
      } else {
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
      }
    } catch (err) {
      setError('공지사항을 불러오는 데 실패했습니다.')
      console.error('Error fetching notices:', err)
    } finally {
      setIsLoading(false)
    }
  }, [activeTab, onTagListUpdate, page, searchTerm, hasMore]) // hasMore를 의존성 배열에 추가

  useEffect(() => {
    if (
      prevActiveTabRef.current !== activeTab ||
      prevSearchTermRef.current !== searchTerm
    ) {
      setNotices([])
      setPage(1)
      prevPageRef.current = 1
      setHasMore(true) // 탭이나 검색어가 변경되면 hasMore를 true로 리셋
    }
    fetchNotices()
  }, [activeTab, fetchNotices, searchTerm])

  const handleScroll = () => {
    if (!containerRef.current || isLoading || !hasMore) return // hasMore 조건 추가

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
  }, [containerRef, isLoading, hasMore]) // hasMore를 의존성 배열에 추가

  if (isLoading && notices.length === 0) {
    return <p>로딩 중...</p>
  }

  if (error) {
    return <p>{error}</p>
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
