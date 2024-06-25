import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const KakaoRedirectHandler = () => {
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    const grant_type = 'authorization_code'
    const client_id = import.meta.env.VITE_KAKAO_JS_SDK_KEY
    const redirect_uri = 'http://localhost:5173/oauth'
    const postUrl = 'https://kauth.kakao.com/oauth/token'
    const getToken = async () => {
      try {
        const response = await axios.post(
          postUrl,
          {
            grant_type: grant_type,
            client_id: client_id,
            redirect_uri: redirect_uri,
            code: code,
          },
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        )
        console.log('TokenGet', response)
      } catch (error) {
        console.log('ERROR:', error)
      }
    }
    getToken()
  }, [])

  return (
    <div>
      kakao login 완료
      <Link to="/">메인으로 이동</Link>
    </div>
  )
}

export default KakaoRedirectHandler
