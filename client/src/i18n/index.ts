import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { storage } from '@/utils/storage'
import type { AppLanguage } from '@/types'

import enCommon from '@/locales/en/common.json'
import enNavigation from '@/locales/en/navigation.json'
import enAuth from '@/locales/en/auth.json'
import enRoles from '@/locales/en/roles.json'
import enValidation from '@/locales/en/validation.json'
import enPages from '@/locales/en/pages.json'
import enSettings from '@/locales/en/settings.json'
import enDashboard from '@/locales/en/dashboard.json'

import faCommon from '@/locales/fa/common.json'
import faNavigation from '@/locales/fa/navigation.json'
import faAuth from '@/locales/fa/auth.json'
import faRoles from '@/locales/fa/roles.json'
import faValidation from '@/locales/fa/validation.json'
import faPages from '@/locales/fa/pages.json'
import faSettings from '@/locales/fa/settings.json'
import faDashboard from '@/locales/fa/dashboard.json'

export const supportedLanguages: AppLanguage[] = ['en', 'fa']

export const getLanguageDirection = (language: AppLanguage): 'ltr' | 'rtl' =>
  language === 'fa' ? 'rtl' : 'ltr'

const getInitialLanguage = (): AppLanguage => {
  const stored = storage.getLanguage()
  if (stored) return stored

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('fa') ? 'fa' : 'en'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      navigation: enNavigation,
      auth: enAuth,
      roles: enRoles,
      validation: enValidation,
      pages: enPages,
      settings: enSettings,
      dashboard: enDashboard,
    },
    fa: {
      common: faCommon,
      navigation: faNavigation,
      auth: faAuth,
      roles: faRoles,
      validation: faValidation,
      pages: faPages,
      settings: faSettings,
      dashboard: faDashboard,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'navigation', 'auth', 'roles', 'validation', 'pages', 'settings', 'dashboard'],
  interpolation: {
    escapeValue: false,
  },
})

export const syncDocumentLanguage = (language: AppLanguage) => {
  const direction = getLanguageDirection(language)
  document.documentElement.lang = language
  document.documentElement.dir = direction
}

syncDocumentLanguage(i18n.language as AppLanguage)

export default i18n
