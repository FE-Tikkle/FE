import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import KakaoLogin from './Pages/KakaoLogin'
import KakaoRedirectHandler from './Pages/KakaoRedirectHandler'
function App() {
  console.log(import.meta.env.VITE_KAKAO_JS_SDK_KEY)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<KakaoLogin />} />
          <Route path="/oauth" element={<KakaoRedirectHandler />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
