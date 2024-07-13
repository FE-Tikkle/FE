import React from 'react'
import MainContainer from './maincontainer'
import './main.css'
import SearchBox from '../Search/Searchbox'
import Calendar from '../Calendar/calendar'
import Schedule from '../Schedule/schedule'
import NoticeSelector from '../Notice/noticeselector'
const Main: React.FC = () => {
  return (
    <>
      <MainContainer>
        <Calendar />
        <Schedule />
        <div className="Noice">
          <SearchBox />
          <NoticeSelector />
        </div>
      </MainContainer>
    </>
  )
}

export default Main
