import axios from 'axios'
const BASE_URL =
  'https://oqn4jdpa4pvtyeodmh5odzofke0ofmje.lambda-url.ap-northeast-3.on.aws'
interface Postsign {
  code: string
}
export function postsign(code: string, provider: string) {
  const postData: Postsign = { code }
  console.log(postData)
  return axios
    .post(`${BASE_URL}/auth/sign?provider=${provider}`, postData)
    .then(res => {
      localStorage.setItem('access', res.data.access_token)
      localStorage.setItem('refresh', res.data.refresh_token)
      window.close()
    })
    .catch(error => {
      alert('로그인을 다시 시도해주세요.')
      throw error
    })
}
