import React, { useState, useEffect } from 'react'
import { gapi, loadAuth2 } from 'gapi-script'
import './calendar.css'
import { GOOGLE_API_KEY, GOOGLE_ID } from '../../store/slices/constant'

const CLIENT_ID = GOOGLE_ID
const API_KEY = GOOGLE_API_KEY
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
]
const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly'

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<any[]>([])
  const [isSignedIn, setIsSignedIn] = useState(false)

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

  const handleAuthClick = async () => {
    try {
      const auth2 = await loadAuth2(gapi, CLIENT_ID, SCOPES)
      if (auth2.isSignedIn.get()) {
        setIsSignedIn(true)
        getEvents()
      } else {
        await auth2.signIn()
        setIsSignedIn(true)
        getEvents()
      }
    } catch (err) {
      console.error('Error signing in:', err)
    }
  }

  const getEvents = async () => {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ).toISOString(),
        timeMax: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
      })
      setEvents(response.result.items)
    } catch (err) {
      console.error('Error fetching events:', err)
    }
  }

  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn)
        setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
      } catch (err) {
        console.error('Error initializing Google API client:', err)
      }
    }
    gapi.load('client:auth2', initClient)
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      getEvents()
    }
  }, [currentDate, isSignedIn])

  useEffect(() => {
    const eventCounts = days.map(day => {
      const count = events.filter(
        event => new Date(event.start.dateTime).getDate() === day
      ).length
      return { day, count }
    })
    console.log('Event counts:', eventCounts)
  }, [events])

  return (
    <div className="Calendar-Container">
      {!isSignedIn && (
        <button onClick={handleAuthClick}>구글 캘린더 연동</button>
      )}
      <div className="month-header">
        <button onClick={() => changeMonth(-1)} className="prev-button">
          &lt;
        </button>
        <div className="month-text">
          <span className="month">{months[currentDate.getMonth()]}</span>
          <span className="year">{currentDate.getFullYear()}</span>
        </div>
        <button onClick={() => changeMonth(1)} className="next-button">
          &gt;
        </button>
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
        {days.map(day => {
          const eventCount = events.filter(
            event => new Date(event.start.dateTime).getDate() === day
          ).length
          return (
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
              <div className="event-count">+ {eventCount}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
