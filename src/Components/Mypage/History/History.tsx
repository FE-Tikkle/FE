import React from 'react'
import './History.css'

const History = () => {
  const bookmarks = [
    { category: '우리학교', count: 10 },
    { category: '취업', count: 5 },
    { category: '대외활동', count: 7 },
    { category: '공모전', count: 3 },
  ]

  return (
    <div className="History-Container">
      <div className="History-title">나의 북마크를 확인해요</div>
      <div className="History-boxs">
        {bookmarks.map((bookmark, index) => (
          <div className="History-box" key={index}>
            <div className="History-item">
              <span className="History-category">{bookmark.category}</span>
              <span className="History-count">{bookmark.count}건</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
