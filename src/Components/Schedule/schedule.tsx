import React from 'react'
import './schedule.css'

const Schedule: React.FC = () => {
  return (
    <div className="Schedule">
      <div className="Schedule-maincontainer">
        <div className="Schedule-main2conatainer">
          <div className="Schedule-recnet-icon"></div>
          <div className="Schedule-date">2024년 7월 8일 화</div>
        </div>
        <div className="Schedule-title">현대로템 디펜스 솔루션 면접</div>
        <div className="Schedule-time">10:00 P.M. ~ 12:00 P.M.</div>
      </div>
      <div className="Schedule-emptycontainer"></div>
      <div className="Schedule-emptycontainer"></div>
      <div className="Schedule-emptycontainer"></div>
      <div className="Schedule-emptycontainer"></div>
    </div>
  )
}

export default Schedule
