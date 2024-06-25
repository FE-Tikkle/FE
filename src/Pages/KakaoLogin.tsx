declare global {
  interface Window {
    Kakao: any
  }
}

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5173/oauth',
      scope: 'profile_nickname,profile_image',
    })
  }

  return (
    <div>
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </div>
  )
}

export default KakaoLogin
