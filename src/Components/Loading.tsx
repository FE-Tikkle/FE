import React from 'react'
import './Loading.css'

const Loading: React.FC = () => {
  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <p className="loading-text">로딩 중입니다 잠시만 기다려주세요...</p>
    </div>
  )
}

export default Loading