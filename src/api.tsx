import axios from 'axios'
import GoogleAuthBody from './store/slices/authslice'

const BASE_URL =
  'https://oqn4jdpa4pvtyeodmh5odzofke0ofmje.lambda-url.ap-northeast-3.on.aws'

const Google_BASE_URL = 'https://oauth2.googleapis.com/token'

interface Postsign {
  code: string
}
interface GoogleAuthBody {
  client_id: string
  client_secret: string
  code: string
  grant_type: string
  redirect_uri: string
}

export function postsign(code: string, provider: string) {
  const postData: Postsign = { code }

  return axios
    .post(`${BASE_URL}/auth/sign?provider=${provider}`, postData)
    .then(res => {
      const authData = {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        is_new: res.data.is_new,
      }
      if (
        window.opener &&
        (provider === 'kakao' || provider === 'naver' || provider === 'google')
      ) {
        window.opener.postMessage(authData, '*')
        console.log('Auth data sent to parent window:', authData)
        window.close()
      }
    })
    .catch(error => {
      alert('로그인을 다시 시도해주세요.')
      // window.close()
      throw error
    })
}
export const postgoogleAuth = (googleAuthData: GoogleAuthBody) => {
  if (!googleAuthData) {
    console.log('Google authentication data is missing')
  }
  return axios
    .post(`${Google_BASE_URL}`, googleAuthData)
    .then(res => {
      console.log('Token', res.data)
      postsign(res.data.access_token, 'google')
    })
    .catch(error => {
      alert('로그인을 다시 시도해주세요')
      console.error(error)
    })
}
