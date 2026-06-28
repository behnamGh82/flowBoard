import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createAppTheme } from '@/theme'
import { useLocale } from '@/contexts/LocaleContext'
import { storage } from '@/utils/storage'
import type { ThemeMode } from '@/types'

interface ThemeContextValue {
  mode: ThemeMode
  toggleMode: () => void
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const getInitialMode = (): ThemeMode => {
  const stored = storage.getThemeMode()
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { direction, language } = useLocale()
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode)

  const setMode = (next: ThemeMode) => {
    setModeState(next)
    storage.setThemeMode(next)
  }

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  const theme = useMemo(
    () => createAppTheme(mode, direction, language),
    [mode, direction, language],
  )

  const value = useMemo(
    () => ({ mode, toggleMode, setMode }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider')
  }
  return context
}
