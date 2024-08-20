import React from 'react'

interface RecruitmentCardProps {
  companyimg: string
  dday: string
  isBookmarked: boolean
  handleBookmarkClick: () => void
  titles: string[]
  tags: string[]
  info: { label: string; value: string }[]
}

const RecruitmentCard: React.FC<RecruitmentCardProps> = ({
  companyimg,
  dday,
  isBookmarked,
  handleBookmarkClick,
  titles,
  tags,
  info,
}) => {
  return (
    <div className="recruitment-mainBox">
      <div className="recruitment-Box1">
        <div className="recruitment-company">
          <img
            src={companyimg}
            alt="Company Logo"
            className="company-logo"
            onError={e => {
              e.currentTarget.src = 'img/Mypage/Proile.svg' // Fallback image path
            }}
          />
        </div>
        <div className="recruitment-dday">{dday}</div>
        <img
          src={isBookmarked ? 'img/Star-none.svg' : 'img/Star.svg'}
          alt="Bookmark"
          className="bookmark-icon1"
          onClick={handleBookmarkClick}
        />
      </div>
      <div className="recruitment-Box2">
        {titles.map((title, index) => (
          <div key={index} className="recruitment-title">
            {title}
          </div>
        ))}
      </div>
      <div className="recruitment-Box3">
        {tags.map((tag, index) => (
          <div key={index} className="recruitment-tag">
            {tag}
          </div>
        ))}
      </div>
      <div className="recruitment-Box4">
        {info.map((item, index) => (
          <div key={index} className="recruitment-info">
            <div className="recruitment-info1">{item.label}</div>
            <div className="recruitment-info2">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecruitmentCard
