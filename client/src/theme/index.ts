import { createTheme, type Direction, type ThemeOptions } from '@mui/material/styles'
import { components } from './components'
import { getPalette } from './palette'
import type { AppLanguage, ThemeMode } from '@/types'

const getFontFamily = (language: AppLanguage) =>
  language === 'fa'
    ? '"Vazirmatn", "Inter", "Roboto", "Helvetica", "Arial", sans-serif'
    : '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'

export const createAppTheme = (
  mode: ThemeMode,
  direction: Direction = 'ltr',
  language: AppLanguage = 'en',
) => {
  const themeOptions: ThemeOptions = {
    direction,
    palette: getPalette(mode),
    typography: {
      fontFamily: getFontFamily(language),
      h1: { fontWeight: 700, fontSize: '2rem' },
      h2: { fontWeight: 700, fontSize: '1.5rem' },
      h3: { fontWeight: 600, fontSize: '1.25rem' },
      h4: { fontWeight: 600, fontSize: '1.125rem' },
      h5: { fontWeight: 600, fontSize: '1rem' },
      h6: { fontWeight: 600, fontSize: '0.875rem' },
      button: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components,
  }

  return createTheme(themeOptions)
}
