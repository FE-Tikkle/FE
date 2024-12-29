import React from 'react'
import './Loading.css'

interface LoadingProps {
  type?: 'mypage' | 'main';
}

const Loading: React.FC<LoadingProps> = ({ type = 'main' }) => {
  return (
    <div className={`loading-wrapper ${type === 'mypage' ? 'loading-mypage' : ''}`}>
      <div className="spinner"></div>
      <p className="loading-text">로딩중...</p>
    </div>
  )
}

export default Loading