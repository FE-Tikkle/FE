import React, { useState } from 'react'
import Notice from '../Notice/notice'
import './scholarshop.css'
interface NoticeData {
  department: string
  title: string
  date: string
}

const Scholarship: React.FC = () => {
  const [notices] = useState<NoticeData[]>([
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
      department: '항공우주공학',
      title:
        "[IPP/현장실습지원센터] 2024-2학기 'HD현대케미칼' 채용연계형 표준 현장실습과제",
      date: '2024.07.01.',
    },
    {
      department: '항공우주공학',
      title:
        "[IPP/현장실습지원센터] 2024-2학기 'HD현대케미칼' 채용연계형 표준 현장실습과제",
      date: '2024.07.01.',
    },
  ])

  return (
    <div className="scholar-all-container">
      {notices.length > 0 ? (
        notices.map((notice, index) => <Notice key={index} notice={notice} />)
      ) : (
        <p>로딩 중... 또는 공지사항이 없습니다.</p>
      )}
    </div>
  )
}

export default Scholarship
