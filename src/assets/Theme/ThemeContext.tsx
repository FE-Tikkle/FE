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
  const [theme, setTheme] = useState<Theme>('navy')

  const themeStyles = {
    light: {
      '--main-background-color': '#FBF9F',
      '--searchbar-background-color': '#3C332B',
      '--searchbar-font-color': 'rgba(255, 255, 255, 0.5)',
      '--button-background-color': '#fff',
      '--button-border': '1px solid #D9D9D9',
      '--main-container-background':
        'linear-gradient(112deg, #F9FBFF -9.21%, #FFE5D4 27.95%, #DBECEF 63.6%, #F3F4F4 97.17%)',
      '--Schedule-recnet-icon-color': '#ffb281',
      '--Schedule-text-icon-color': '#3c332b',
      '--Search-new-platform': '#ffeee3',
      '--Srollbar': '#ffd0b0',
    },
    navy: {
      '--main-background-color': ' #FBF9F6',
      '--searchbar-background-color': '#101B49',
      '--searchbar-font-color': 'rgba(255, 255, 255, 0.50)',
      '--button-background-color': '#FFFFFF',
      '--button-border': '1px solid #D9D9D9',
      '--main-container-background':
        'linear-gradient(107deg, #EEEEFD 11.23%, #DDE7F4 40.83%, #E9F2FF 65.36%)',
      '--Schedule-recnet-icon-color': '#E4EFFC',
      '--Schedule-text-icon-color': '#101B49',
      '--Search-new-platform': '#E4EFFC',
      '--Srollbar': '#101b49',
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
