const STORAGE_KEY = 'pm_theme_mode'

export const storage = {
  getThemeMode(): 'light' | 'dark' | null {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark') return value
    return null
  },

  setThemeMode(mode: 'light' | 'dark') {
    localStorage.setItem(STORAGE_KEY, mode)
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
