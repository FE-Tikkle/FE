import React, { useState } from 'react'
import './Content.css'
import Noticelist from './Notice/noticelist'
import Noticemain from './Notice/noticemain'
import Recruitment from './Recruitment/recruitment'
import Activities from './Activities/activities'
const ContentSelector: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState('공지사항')
  const [activeTab, setActiveTab] = useState('전체')

  const notices = ['공지사항', '장학', '채용공고', '대외활동', '공모전']
  const tabs = ['전체', '학사', '장학', '특강', '모집 / 채용', '기타']

  const renderContent = () => {
    switch (selectedNotice) {
      case '공지사항':
        return (
          <>
            <Noticelist />
            <Noticemain />
          </>
        )
      case '장학':
        return null
      case '채용공고':
        return <Recruitment />
      case '대외활동':
        return <Activities />
    }
  }
  return (
    <>
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
      <div className="Contents">{renderContent()}</div>
    </>
  )
}

export default ContentSelector
