const KakaoRedirectHandler = () => {
  return (
    <div>
      kakao login 완료
      <button
        onClick={() => {
          window.location.href = '/'
        }}
      >
        메인으로 이동
      </button>
    </div>
  )
}

export default KakaoRedirectHandler
