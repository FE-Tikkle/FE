import axios from 'axios'

const BASE_URL =
  'https://oqn4jdpa4pvtyeodmh5odzofke0ofmje.lambda-url.ap-northeast-3.on.aws'

interface Postsign {
  code: string
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
      if (window.opener && (provider === 'kakao' || provider === 'naver')) {
        window.opener.postMessage(authData, '*')
        console.log('Auth data sent to parent window:', authData)
        window.close()
      } else {
        console.log('Provider is not Kakao or Naver, or window.opener is null')
        console.log(authData)
        if (authData) {
          localStorage.setItem('access_token', authData.access_token)
          localStorage.setItem('refresh_token', authData.refresh_token)
          localStorage.setItem('is_new', authData.is_new.toString())
          console.log('Data saved to localStorage.')
        }
        window.close()
      }
    })
    .catch(error => {
      alert('로그인을 다시 시도해주세요.')
      window.close()
      throw error
    })
}
