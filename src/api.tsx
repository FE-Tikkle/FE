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
    .then(res => res.data)
}
