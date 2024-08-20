import React, { useEffect, useState } from 'react'
import RecruitmentCard from './recruitmentCard'
import { fetchRecruitments } from '../../../api' // Ensure this path is correct
import './recruitment.css'
import { Recruitment } from '../../../store/Rec'

const RecruitmentContainer: React.FC = () => {
  const [recruitments, setRecruitments] = useState<Recruitment[]>([])
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Fetch data from the API when the component loads
    const loadRecruitments = async () => {
      const data = await fetchRecruitments()
      setRecruitments(data)
    }

    loadRecruitments()
  }, [])

  const handleBookmarkClick = (id: string) => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="recruitment-container">
      {recruitments.map(recruitment => (
        <RecruitmentCard
          key={recruitment.id} // Use a unique identifier instead of index
          companyimg={recruitment.company_img}
          dday={recruitment.dday}
          isBookmarked={bookmarks[recruitment.id]} // Use the unique ID for bookmarks
          handleBookmarkClick={() => handleBookmarkClick(recruitment.id)}
          titles={recruitment.titles}
          tags={recruitment.tags}
          info={recruitment.info}
        />
      ))}
    </div>
  )
}

export default RecruitmentContainer
