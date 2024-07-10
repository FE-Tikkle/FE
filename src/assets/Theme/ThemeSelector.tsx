import React from 'react'
import { useTheme } from './ThemeContext'
import './Theme.css'
const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  function toggleTheme(e: React.MouseEvent<HTMLDivElement>) {
    const container = e.currentTarget
    container.classList.toggle('move-image')
    setTheme(theme === 'light' ? 'navy' : 'light')
  }

  return (
    <div>
      <div className="Themecontainer" onClick={toggleTheme}>
        <img className="Themselector" src="img/Theme.svg" alt="Theme Icon" />
        <label className="Themeselector-text">테마 변경</label>
      </div>
    </div>
  )
}

export default ThemeSelector
