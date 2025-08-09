import React, { useState} from 'react'
// import { gapi} from 'gapi-script'
import './calendar.css'
import CalendarNavbar from './calendarNavbar'
import Timetable from "../Timetable/Timetable"
// import { GOOGLE_API_KEY, GOOGLE_ID } from '../../store/slices/constant'
// import * as Sentry from '@sentry/react';
// const CLIENT_ID = GOOGLE_ID
// const API_KEY = GOOGLE_API_KEY
// const DISCOVERY_DOCS = [
//   'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
// ]
// const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly'

const Calendar: React.FC<{
  setSelectedDate: (date: Date) => void
  setSelectedEvents: (events: any[]) => void
}> = ({ setSelectedDate, setSelectedEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  // const [events, setEvents] = useState<any[]>([])
  // const [isSignedIn, setIsSignedIn] = useState(false)

  // 탭 상태 추가: calendar / timetable
  const [selectedTab, setSelectedTab] = useState<'calendar' | 'timetable'>('calendar')
  
  
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
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  

  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + offset)
      return newDate
    })
  }

  // const handleAuthClick = async () => {
  //   try {
  //     const auth2 = await loadAuth2(gapi, CLIENT_ID, SCOPES)
  //     if (auth2.isSignedIn.get()) {
  //       setIsSignedIn(true)
  //       getEvents()
  //     } else {
  //       await auth2.signIn()
  //       setIsSignedIn(true)
  //       getEvents()
  //     }
  //   } catch (err) {
  //     console.error('Error signing in:', err)
  //   }
  // }

  // const getEvents = async () => {
  //   try {
  //     const response = await gapi.client.calendar.events.list({
  //       calendarId: 'primary',
  //       timeMin: new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth(),
  //         1
  //       ).toISOString(),
  //       timeMax: new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth() + 1,
  //         0
  //       ).toISOString(),
  //       showDeleted: false,
  //       singleEvents: true,
  //       orderBy: 'startTime',
  //     })
  //     setEvents(response.result.items)
  //   } catch (err) {
  //     Sentry.captureException(err);
  //     console.error('Error fetching events:', err)
  //   }
  // }

  // useEffect(() => {
  //   const initClient = async () => {
  //     try {
  //       await gapi.client.init({
  //         apiKey: API_KEY,
  //         clientId: CLIENT_ID,
  //         discoveryDocs: DISCOVERY_DOCS,
  //         scope: SCOPES,
  //       })
  //       gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn)
  //       setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
  //     } catch (err) {
  //       Sentry.captureException(err);
  //       console.error('Error initializing Google API client:', err)
  //     }
  //   }
  //   gapi.load('client:auth2', initClient)
  // }, [])

  // useEffect(() => {
  //   if (isSignedIn) {
  //     getEvents()
  //   }
  // }, [currentDate, isSignedIn])

  const handleDayClick = (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
    setSelectedDate(selected)
    // const eventsForDay = events.filter(
    //   event => new Date(event.start.dateTime).getDate() === day
    // )
    setSelectedEvents([]) // 임시로 빈 배열 전달 나중에 여기 수정하면 됨
  }
  return (
    <div className= "calendar-box">
      {/* 탭 네비게이션 */}
      <CalendarNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
  
      {/* 탭에 따라 달라지는 화면 */}
      {selectedTab === 'calendar' ? (
        <div className="Calendar-Container">
          <div className="month-header">
            <div className="month-text">
              <span className="month">{months[currentDate.getMonth()]}</span>
            </div>
            <div className="nav-buttons">
            <button onClick={() => changeMonth(-1)} className="prev-button">
              &lt;
            </button>
            <button onClick={() => changeMonth(1)} className="next-button">
              &gt;
            </button>
            </div>
          </div>
  
          <div className="week-days">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div
                key={day}
                className={`week-day ${index === 0 ? 'sunday' : ''} ${index === 6 ? 'saturday' : ''}`}
              >
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
            {days.map((day, index) => {
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
  
              const isFirstRow = index + firstDayOfMonth < 7
  
              return (
                <div
                  key={day}
                  className={`day ${isToday ? 'today' : ''} ${isFirstRow ? 'first-row' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="day-number">{day}</div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="timetable-container">
          <Timetable/>
        </div>
      )}
    </div>
  )
}
export default Calendar