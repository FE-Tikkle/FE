import React from 'react'
import './schedule.css'

// 선택된 날짜와 이벤트를 받아서 일정 표시
const Schedule: React.FC<{ date: Date | null; events: any[] }> = ({
  date,
  events,
}) => {
  if (!date) {
    return <div className="Schedule">날짜를 선택하세요.</div>
  }

  return (
    <div className="Schedule">
      <div className="Schedule-maincontainer">
        <div className="Schedule-main2conatainer">
          <div className="Schedule-recnet-icon"></div>
          <div className="Schedule-date">
            {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
          </div>
        </div>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div className="Schedule-key" key={index}>
              <div className="Schedule-title">{String(event.summary)}</div>
              <div className="Schedule-time">
                {new Date(event.start.dateTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                ~{' '}
                {new Date(event.end.dateTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="Schedule-title">일정이 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default Schedule
