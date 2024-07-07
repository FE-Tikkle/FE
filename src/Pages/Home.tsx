import React from 'react'
import Header from '../Components/Header/Header'
import Loading from '../Components/Loading'
import Footer from '../Components/Footer/Footer'
import AuthHandler from '../Components/Login/AuthHandler'
const Home: React.FC = () => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  return (
    <div>
      {code ? (
        <div>
          <Loading />
          <AuthHandler />
        </div>
      ) : (
        <div>
          <Header />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Home
