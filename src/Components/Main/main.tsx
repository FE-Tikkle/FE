import React from 'react'
import MainContainer from './maincontainer'
import './main.css'
import SearchBox from '../Search/Searchbox'
import Calendar from '../Calendar/calendar'
import Schedule from '../Schedule/schedule'
import ContentSelector from '../MainContent/Contentselector'

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
          <ContentSelector />
        </div>
      </MainContainer>
    </>
  )
}

export default Main
