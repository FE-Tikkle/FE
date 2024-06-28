import { postsign } from '../api'

const KakaoRedirectHandler = () => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  if (code) {
    postsign(code, 'kakao').catch(error => {
      console.error('Postsign error:', error)
      alert('로그인 실패, 다시 시도해주세요.')
    })
  }

  return <div>확인중입니다. 잠시만 기다려주세요</div>
}

export default KakaoRedirectHandler
