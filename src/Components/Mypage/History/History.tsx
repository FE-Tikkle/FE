import React, { useState, useEffect } from 'react'
import './History.css'
import MypageContentSelector from './MypageContentSelector'
import { getBookmarkStats, BookmarkStats } from '../../../api'

const History: React.FC = () => {
  const [bookmarkStats, setBookmarkStats] = useState<BookmarkStats | null>(null);

  useEffect(() => {
    const fetchBookmarkStats = async () => {
      try {
        const stats = await getBookmarkStats();
        setBookmarkStats(stats);
        
      } catch (error) {
        console.error('Failed to fetch bookmark stats:', error);
      }
    };

    fetchBookmarkStats();
  }, [bookmarkStats]);

  const bookmarks = [
    { category: '우리학교', count: bookmarkStats?.notice || 0 },
    { category: '취업', count: bookmarkStats?.saramin || 0 },
  ];

  return (
    <div className="History-All">
      <div className="History-title">나의 북마크를 확인해요</div>
      <div className="History-Container">
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
        <MypageContentSelector />
      </div>
    </div>
  )
}

export default History