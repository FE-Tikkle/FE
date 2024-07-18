import React from 'react'
import './activites.css'

interface ActivityCardProps {
  title: string
  organization: string
  ddays: string[]
  target: string
  interestArea: string
  deadline: string
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  organization,
  ddays,
  target,
  interestArea,
  deadline,
}) => {
  return (
    <div className="Activities-Card">
      <div className="Activities-Card-title">{title}</div>
      <div className="Activities-Card-main">
        <div className="Activities-Card-img"></div>
        <div className="Activities-Card-main-right">
          <div className="Activities-Card-main-title">{organization}</div>
          <div className="Activities-Card-main-text">
            <div className="Activities-Card-main-dday">
              <div className="Activities-Card-main-ddaybox">{ddays}</div>
              <div className="Activities-Card-main-ddaybox2"># 비영리단체</div>
              <div className="Activities-Card-main-ddaybox2"># 봉사단</div>
            </div>
            <div className="Activities-Card-main-info">
              <div className="Activities-Card-main-info1">참여대상</div>
              <div className="Activities-Card-main-info2">{target}</div>
              <div className="Activities-Card-main-info1">관심분야</div>
              <div className="Activities-Card-main-info2">{interestArea}</div>
              <div className="Activities-Card-main-info1">마감일</div>
              <div className="Activities-Card-main-info2">{deadline}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
