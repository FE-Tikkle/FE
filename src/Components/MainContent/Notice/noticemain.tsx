import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notice from './notice'
import Pagination from '../pagination'

interface NoticeData {
  department: string
  title: string
  date: string
}

const Noticemain: React.FC = () => {
  const [notices, setNotices] = useState<NoticeData[]>([
    {
      department: '디자인융합',
      title:
        '[대학원생연구실센터] 4단계 BK21사업 대학원혁신 영역 수행을 위한 전담(탁약)연구원 채용 공고',
      date: '2024.07.01.',
    },
    {
      department: '미디어커뮤니케이션',
      title:
        "[협성재단] 2024학년도 1학기 시학봉사지원금 및 'Remember0727' 장학금 신청 안내",
      date: '2024.07.01.',
    },
    {
      department: '고분자공학',
      title:
        '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) - 음림, 하이테크 105호',
      date: '2024.07.01.',
    },
    {
      department: '항공우주공학',
      title:
        "[IPP/현장실습지원센터] 2024-2학기 'HD현대케미칼' 채용연계형 표준 현장실습과제",
      date: '2024.07.01.',
    },
    {
      department: '디자인테크놀로지',
      title:
        '[정보통신]Microsoft OneDrive 사용자 용량 제한으로 인한 데이터 백업 안내',
      date: '2024.07.01.',
    },
    {
      department: '디자인테크놀로지',
      title:
        '[정보통신]Microsoft OneDrive 사용자 용량 제한으로 인한 데이터 백업 안내',
      date: '2024.07.01.',
    },
    {
      department: '디자인테크놀로지',
      title:
        '[정보통신]Microsoft OneDrive 사용자 용량 제한으로 인한 데이터 백업 안내',
      date: '2024.07.01.',
    },
  ])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const noticesPerPage: number = 5

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get<NoticeData[]>(
          'https://api.example.com/notices'
        ) // Replace with your API endpoint
        setNotices(response.data)
      } catch (error) {
        console.error('Error fetching notices:', error)
      }
    }

    fetchNotices()
  }, [])

  const indexOfLastNotice = currentPage * noticesPerPage
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="notice-all-container">
      <div className="notice-container">
        {currentNotices.map((notice, index) => (
          <Notice key={index} notice={notice} />
        ))}
      </div>
      <Pagination
        noticesPerPage={noticesPerPage}
        totalNotices={notices.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Noticemain
