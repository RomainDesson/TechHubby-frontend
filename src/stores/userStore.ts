import { create } from 'zustand'

interface UserStoreState {
  username: string
  isLoggedIn: boolean
  userSocketId: string
  setUserSocketId: (socketId: string) => void
  setUsername: (username: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  logout: () => void
  userInterests: string[]
  setUserInterests: (interests: string[]) => void
}

export const useUserStore = create<UserStoreState>((set) => ({
  username: '',
  isLoggedIn: false,
  userSocketId: '',
  setUsername: (username) => set({ username }),
  setUserSocketId: (socketId) => set({ userSocketId: socketId }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  logout: () => set({ username: '', isLoggedIn: false }),
  userInterests: [],
  setUserInterests: (interests: string[]) => set({ userInterests: interests }),
}))
