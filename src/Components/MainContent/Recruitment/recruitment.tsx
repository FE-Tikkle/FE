import React, { useState } from 'react'
import RecruitmentCard from './recruitmentCard'
import './recruitment.css'

interface Recruitment {
  company: string
  dday: string
  titles: string[]
  tags: string[]
  info: { label: string; value: string }[]
}

const mockRecruitments: Recruitment[] = [
  {
    company: 'path_to_ABC_logo.png',
    dday: 'D-5',
    titles: ['ABC 기술', '프론트엔드 개발자'],
    tags: ['React', 'TypeScript', 'Javascript'],
    info: [
      { label: '경력', value: '3년 이상' },
      { label: '급여', value: '연 6,000만원' },
      { label: '급여', value: '연 6,000만원' },
    ],
  },
  {
    company: 'path_to_ABC_logo.png',
    dday: 'D-3',
    titles: ['XYZ 솔루션', '프론트엔드 개발자'],
    tags: ['Node.js', 'Python', 'TypeScript'],
    info: [
      { label: '경력', value: '3년 이상' },
      { label: '급여', value: '연 6,000만원' },
      { label: '급여', value: '연 6,000만원' },
    ],
  },
]

const RecruitmentContainer: React.FC = () => {
  const [recruitments, setRecruitments] =
    useState<Recruitment[]>(mockRecruitments)
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({})

  const handleBookmarkClick = (id: string) => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="recruitment-container">
      {recruitments.map((recruitment, index) => (
        <RecruitmentCard
          key={index}
          company={recruitment.company}
          dday={recruitment.dday}
          isBookmarked={bookmarks[index]}
          handleBookmarkClick={() => handleBookmarkClick(index.toString())}
          titles={recruitment.titles}
          tags={recruitment.tags}
          info={recruitment.info}
        />
      ))}
    </div>
  )
}

export default RecruitmentContainer
