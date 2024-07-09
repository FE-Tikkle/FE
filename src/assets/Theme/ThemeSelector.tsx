import React from 'react'
import { useTheme } from './ThemeContext'

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <button onClick={() => setTheme('light')} disabled={theme === 'light'}>
        Light Theme
      </button>
      <button onClick={() => setTheme('dark')} disabled={theme === 'dark'}>
        Dark Theme
      </button>
      <button onClick={() => setTheme('blue')} disabled={theme === 'blue'}>
        Blue Theme
      </button>
      <button onClick={() => setTheme('green')} disabled={theme === 'green'}>
        Green Theme
      </button>
    </div>
  )
}

export default ThemeSelector
