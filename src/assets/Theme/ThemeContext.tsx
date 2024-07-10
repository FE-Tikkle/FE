import React, { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'navy'

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')

  const themeStyles = {
    light: {
      '--main-background-color': '#F5F3F0',
      '--searchbar-background-color': '#dbd7d4',
      '--searchbar-font-color': 'rgba(35, 35, 35, 0.50)',
      '--button-background-color': '#fff',
      '--button-border': 'none',
      '--main-container-background':
        'conic-gradient(from 107deg at 45.62% 65.84%, #f9fbff 0deg, #f6ceb3 114.66499328613281deg, #dbecef 246.04843139648438deg, #f3f4f4 360deg)',
    },
    navy: {
      '--main-background-color': ' #FBF9F6',
      '--searchbar-background-color': '#101B49',
      '--searchbar-font-color': 'rgba(255, 255, 255, 0.50)',
      '--button-background-color': '#FFFFFF',
      '--button-border': '1px solid #D9D9D9',
      '--main-container-background':
        'conic-gradient(from 122deg at 47.97% 52.33%, #EEEEFD 27.67605721950531deg, #DDE7F4 114.66499328613281deg, #E9F2FF 246.04843139648438deg)',
    },
  }

  React.useEffect(() => {
    const root = document.documentElement
    const styles = themeStyles[theme]
    Object.keys(styles).forEach(key => {
      root.style.setProperty(key, styles[key as keyof typeof styles])
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
