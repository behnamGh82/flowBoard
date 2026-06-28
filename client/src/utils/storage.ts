const THEME_KEY = 'pm_theme_mode'
const LANGUAGE_KEY = 'pm_language'

export const storage = {
  getThemeMode(): 'light' | 'dark' | null {
    const value = localStorage.getItem(THEME_KEY)
    if (value === 'light' || value === 'dark') return value
    return null
  },

  setThemeMode(mode: 'light' | 'dark') {
    localStorage.setItem(THEME_KEY, mode)
  },

  getLanguage(): 'en' | 'fa' | null {
    const value = localStorage.getItem(LANGUAGE_KEY)
    if (value === 'en' || value === 'fa') return value
    return null
  },

  setLanguage(language: 'en' | 'fa') {
    localStorage.setItem(LANGUAGE_KEY, language)
  },

  getToken(): string | null {
    return localStorage.getItem('pm_access_token')
  },

  setToken(token: string) {
    localStorage.setItem('pm_access_token', token)
  },

  removeToken() {
    localStorage.removeItem('pm_access_token')
  },
}
