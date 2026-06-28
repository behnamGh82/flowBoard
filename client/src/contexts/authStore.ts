import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { storage } from '@/utils/storage'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        storage.setToken(token)
        set({ isAuthenticated: true })
      },
      logout: () => {
        storage.removeToken()
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'pm-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
