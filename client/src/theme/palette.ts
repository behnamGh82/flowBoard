import type { PaletteMode } from '@mui/material'

const brand = {
  primary: {
    main: '#4F46E5',
    light: '#818CF8',
    dark: '#3730A3',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#0EA5E9',
    light: '#38BDF8',
    dark: '#0369A1',
    contrastText: '#FFFFFF',
  },
}

export const getPalette = (mode: PaletteMode) => ({
  mode,
  primary: brand.primary,
  secondary: brand.secondary,
  ...(mode === 'light'
    ? {
        background: {
          default: '#F4F6FB',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        },
        divider: 'rgba(15, 23, 42, 0.08)',
      }
    : {
        background: {
          default: '#0B1120',
          paper: '#111827',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
        divider: 'rgba(148, 163, 184, 0.12)',
      }),
})
