import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { useTranslation } from 'react-i18next'
import '@/i18n'
import { getLanguageDirection, syncDocumentLanguage } from '@/i18n'
import { storage } from '@/utils/storage'
import { syncDayjsLocale } from '@/utils/formatDate'
import type { AppLanguage } from '@/types'

interface LocaleContextValue {
  language: AppLanguage
  direction: 'ltr' | 'rtl'
  setLanguage: (language: AppLanguage) => void
  toggleLanguage: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const cacheLtr = createCache({ key: 'muiltr' })
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState<AppLanguage>(
    () => (i18n.language as AppLanguage) || 'en',
  )

  const direction = getLanguageDirection(language)
  const emotionCache = direction === 'rtl' ? cacheRtl : cacheLtr

  const setLanguage = (next: AppLanguage) => {
    setLanguageState(next)
    storage.setLanguage(next)
    void i18n.changeLanguage(next)
  }

  const toggleLanguage = () => setLanguage(language === 'en' ? 'fa' : 'en')

  useEffect(() => {
    syncDocumentLanguage(language)
    syncDayjsLocale(language)
  }, [language])

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLanguageState(lng as AppLanguage)
    }

    i18n.on('languageChanged', handleLanguageChanged)
    return () => i18n.off('languageChanged', handleLanguageChanged)
  }, [i18n])

  const value = useMemo(
    () => ({ language, direction, setLanguage, toggleLanguage }),
    [language, direction],
  )

  return (
    <LocaleContext.Provider value={value}>
      <CacheProvider value={emotionCache}>{children}</CacheProvider>
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}
