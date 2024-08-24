import React, { useState } from 'react'
import './Content.css'
import Noticelist from './Notice/noticelist'
import Noticemain from './Notice/noticemain'
import Activities from './Activities/activities'
import SearchBox from '../Search/Searchbox'
import Scholarship from './Scholarship/scholarship'
import Competition from './Competition/competition'
import Department from './Department/Department'
import RecruitmentContainer from './Recruitment/recruitment'
import Job from './job/job'

const ContentSelector: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState('공지사항')
  const [activeTab, setActiveTab] = useState('전체')
  const [tabs, setTabs] = useState(['전체'])
  const [searchTerm, setSearchTerm] = useState('')
  const notices = ['공지사항', '채용공고', '장학', '대외활동', '공모전']
  const scholarshipTabs = ['전체', '학자금', '장학금', '학자금 대출']

  const handleTagListUpdate = (tagList: string[]) => {
    setTabs(['전체', ...tagList])
  }
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }
  const renderContent = () => {
    switch (selectedNotice) {
      case '공지사항':
        return (
          <>
            <Department />
            <SearchBox onSearch={handleSearch} />
            <Noticelist />
            <Noticemain
              activeTab={activeTab}
              onTagListUpdate={handleTagListUpdate}
              searchTerm={searchTerm}
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
        return (
          <>
            <Job />
            <SearchBox onSearch={handleSearch} />
            <RecruitmentContainer searchTerm={searchTerm} />
          </>
        )
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
      </div>

      <div className="Contents">{renderContent()}</div>
    </div>
  )
}

export default ContentSelector
