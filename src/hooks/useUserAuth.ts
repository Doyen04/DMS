import { create } from 'zustand'
import { Session } from 'next-auth'

interface AuthState {
    session: Session | null
    isAuthenticated: boolean
    setSession: (session: Session | null) => void
    logout: () => void
}

export const useUserAuth = create<AuthState>((set) => ({
    session: null,
    isAuthenticated: false,
    setSession: (session) => set({ 
        session, 
        isAuthenticated: !!session 
    }),
    logout: () => set({ 
        session: null, 
        isAuthenticated: false 
    }),
}))

export default useUserAuth