import React, { useState } from 'react'
import './notice.css'
const NoticeSelector: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState('공지사항')
  const [activeTab, setActiveTab] = useState('전체')

  const notices = ['공지사항', '장학', '채용공고', '대외활동', '공모전']
  const tabs = ['전체', '학사', '장학', '특강', '모집 / 채용', '기타']
  return (
    <>
      <div className="NoticeSelector-main">
        {notices.map(notice => (
          <div
            key={notice}
            className={`NoticeSelector-sector ${
              selectedNotice === notice ? 'selected' : ''
            }`}
            onClick={() => setSelectedNotice(notice)}
          >
            {notice}
          </div>
        ))}
      </div>
      <div className="NoticeSelector-main2">
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
    </>
  )
}

export default NoticeSelector
