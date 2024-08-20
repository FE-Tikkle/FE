import React, { useState } from 'react'
import './Content.css'
import Noticelist from './Notice/noticelist'
import Noticemain from './Notice/noticemain'
import Recruitment from './Recruitment/recruitment'
import Activities from './Activities/activities'
import SearchBox from '../Search/Searchbox'
import Scholarship from './Scholarship/scholarship'
import Competition from './Competition/competition'
import Department from './Department/Department'

const ContentSelector: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState('공지사항')
  const [activeTab, setActiveTab] = useState('전체')
  const [tabs, setTabs] = useState(['전체'])

  const notices = ['공지사항', '채용공고', '장학', '대외활동', '공모전']
  const scholarshipTabs = ['전체', '학자금', '장학금', '학자금 대출']

  const handleTagListUpdate = (tagList: string[]) => {
    setTabs(['전체', ...tagList])
  }

  const renderContent = () => {
    switch (selectedNotice) {
      case '공지사항':
        return (
          <>
            <Noticelist />
            <Noticemain
              activeTab={activeTab}
              onTagListUpdate={handleTagListUpdate}
            />
          </>
        )
      case '장학':
        return (
          <>
            {/* <Noticelist /> */}
            <Scholarship />
          </>
        )
      case '채용공고':
        return <Recruitment />
      case '대외활동':
        return <Activities />
      case '공모전':
        return <Competition />
    }
  }

  return (
    <div className="Content-selector">
      <div className="Content-Selector-main">
        {notices.map(notice => (
          <div
            key={notice}
            className={`Content-Selector-sector ${
              selectedNotice === notice ? 'selected' : ''
            }`}
            onClick={() => setSelectedNotice(notice)}
          >
            {notice}
          </div>
        ))}
      </div>

      <div className="Counter-main2">
        {selectedNotice === '공지사항' && (
          <div className="Content-Selector-main2">
            {tabs.map(tab => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        )}

        {selectedNotice === '장학' && (
          <div className="Content-Selector-main2">
            {/* {scholarshipTabs.map(tab => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))} */}
          </div>
        )}

        <SearchBox />
      </div>

      <div className="Contents">{renderContent()}</div>
      {selectedNotice !== '대외활동' && selectedNotice !== '공모전' && (
        <Department />
      )}
    </div>
  )
}

export default ContentSelector
