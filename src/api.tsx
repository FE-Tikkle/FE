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
      window.close()
      throw error
    })
}
