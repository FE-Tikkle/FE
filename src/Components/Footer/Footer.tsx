import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <div className="Footer-main">
        <div className="Footer-Container">
          <div className="Footer-Logo">2024 티끌. AII RIGHT RESERVED.</div>
          <div className="Footer-text">
            <div>tikkeul@gmail.com</div>인천광역시 미추홀구 인하로 100
          </div>
        </div>
        <div className="Footer-up" onClick={scrollToTop}>
          <img src="img/up.svg" alt="Up" />
        </div>
      </div>
    </div>
  )
}

export default Footer
