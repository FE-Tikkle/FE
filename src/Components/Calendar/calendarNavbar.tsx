import React from "react"
import "./calendarNavbar.css"

interface Props {
  selectedTab: "calendar" | "timetable"
  setSelectedTab: (tab: "calendar" | "timetable") => void
}

const CalendarNavbar: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="calendar-navbar">
      <button
        className={selectedTab === "calendar" ? "active" : ""}
        onClick={() => setSelectedTab("calendar")}
      >
        캘린더
      </button>
      <button
        className={selectedTab === "timetable" ? "active" : ""}
        onClick={() => setSelectedTab("timetable")}
      >
        시간표
      </button>
    </div>
  )
}

export default CalendarNavbar
