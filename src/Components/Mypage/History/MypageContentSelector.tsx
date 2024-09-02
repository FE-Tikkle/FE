import React, { useState } from 'react'
import './History.css'
import HistoryTable from './HistoryTable'

const MypageContentSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState('')

  const tabs = ['공지사항', '채용공고', '장학', '대외활동', '공모전']

  return (
    <div className="Mypage-selector">
      <div className="Mypage-main2">
        <div className="Mypage-Selector-main2">
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
      </div>
      <HistoryTable activeTab={activeTab} />
    </div>
  )
}

export default MypageContentSelector

