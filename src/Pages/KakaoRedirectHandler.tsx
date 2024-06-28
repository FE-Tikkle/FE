import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { postsign } from '../api'

const KakaoRedirectHandler = () => {
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  if (code) {
    postsign(code, 'kakao')
      .then(response => {
        console.log('Postsign response:', response)
      })
      .catch(error => {
        console.error('Postsign error:', error)
        alert('로그인 실패, 다시 시도해주세요.')
      })
  }

  return (
    <div>
      kakao login 완료
      <button
        onClick={() => {
          window.location.href = '/'
        }}
      >
        메인으로 이동
      </button>
    </div>
  )
}

export default KakaoRedirectHandler
