import React, { useState } from 'react'
import './calendar.css'

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + offset)
      return newDate
    })
  }

  return (
    <div className="Calendar-Container">
      <div className="month-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="week-days">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="week-day">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="empty-day" />
          ))}
        {days.map(day => (
          <div
            key={day}
            className={`day ${
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()
                ? 'today'
                : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
