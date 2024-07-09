import React, { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'blue' | 'green'

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
      '--background-color': '#dbd7d4',
      '--button-background-color': '#fff',
      '--button-text-color': '#484848',
      '--button-hover-border-color': '#dbd7d4',
      '--button-hover-shadow-color': '#dbd7d4',
    },
    dark: {
      '--background-color': '#333',
      '--button-background-color': '#555',
      '--button-text-color': '#fff',
      '--button-hover-border-color': '#444',
      '--button-hover-shadow-color': '#444',
    },
    blue: {
      '--background-color': '#e0f7fa',
      '--button-background-color': '#4fc3f7',
      '--button-text-color': '#fff',
      '--button-hover-border-color': '#29b6f6',
      '--button-hover-shadow-color': '#29b6f6',
    },
    green: {
      '--background-color': '#e8f5e9',
      '--button-background-color': '#66bb6a',
      '--button-text-color': '#fff',
      '--button-hover-border-color': '#43a047',
      '--button-hover-shadow-color': '#43a047',
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
