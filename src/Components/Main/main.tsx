import React from 'react'
import MainContainer from './maincontainer'
import './main.css'
import SearchBox from '../Search/Searchbox'
import Calendar from '../Calendar/calendar'
import Schedule from '../Schedule/schedule'
import NoticeSelector from '../Notice/noticeselector'
import Noticelist from '../Notice/noticelist'
import Noticemain from '../Notice/noticemain'
const Main: React.FC = () => {
  return (
    <>
      <MainContainer>
        <div className="main-left">
          <Calendar />
          <Schedule />
        </div>
        <div className="Noice">
          <SearchBox />
          <NoticeSelector />
          <Noticelist />
          <Noticemain />
        </div>
      </MainContainer>
    </>
  )
}

export default Main
