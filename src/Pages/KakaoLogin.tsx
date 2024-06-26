const KakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_JS_SDK_KEY
  const REDIRECT_URI = 'http://localhost:5173/oauth'
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }

  return (
    <button type="button" onClick={loginHandler}>
      로그인 하기
    </button>
  )
}

export default KakaoLogin
