import React, { useState } from 'react'
import './History.css'
import HistoryTable from './HistoryTable'
const MypageMypageSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState('전체')

  const tabs = ['공지사항', '장학', '채용공고', '대외활동', '공모전']

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
      <HistoryTable />
    </div>
  )
}

export default MypageMypageSelector
