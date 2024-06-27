import axios from 'axios'

const instance = axios.create({
  baseURL:
    'https://oqn4jdpa4pvtyeodmh5odzofke0ofmje.lambda-url.ap-northeast-3.on.aws/', // API의 기본 URL을 설정합니다.
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

export default instance
