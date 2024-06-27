import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <h2>홈 페이지</h2>
      <p>이 페이지는 예시로 만든 홈 페이지입니다.</p>
      <Link to="/login">카카오 로그인으로 이동</Link>
    </div>
  )
}

export default Home
