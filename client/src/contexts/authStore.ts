import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '@/types'
import { storage } from '@/utils/storage'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  hasRole: (roles: UserRole[]) => boolean
  setUser: (user: User | null) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasRole: (roles: UserRole[]) => {
        const role = get().user?.role
        return !!role && roles.includes(role)
      },
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setToken: (token: string) => {
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
