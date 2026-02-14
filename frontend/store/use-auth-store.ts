import { create } from 'zustand'
import { User } from '@/types'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    initialized: boolean
    login: (user: User) => void
    logout: () => void
    setLoading: (loading: boolean) => void
    initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    initialized: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    setLoading: (loading) => set({ loading }),
    initializeAuth: () => {
        // Prevent multiple initializations
        if (useAuthStore.getState().initialized) return

        set({ initialized: true })

        // Listen to Firebase auth state changes
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const user: User = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    name: firebaseUser.displayName || undefined,
                    createdAt:
                        firebaseUser.metadata.creationTime || new Date().toISOString(),
                }
                set({ user, isAuthenticated: true, loading: false })
            } else {
                set({ user: null, isAuthenticated: false, loading: false })
            }
        })
    },
}))
