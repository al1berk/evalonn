import { User } from '@/types'
import { USE_MOCK_DATA } from '@/lib/constants'
import { apiClient } from '@/lib/api-client'

// Mock users (localStorage'da saklanacak)
const MOCK_USERS_KEY = 'evalon_mock_users'
const AUTH_TOKEN_KEY = 'evalon_auth_token'

interface LoginCredentials {
    email: string
    password: string
}

interface SignupData {
    email: string
    password: string
    name: string
}

interface AuthResponse {
    user: User
    token: string
}

// Demo kullanıcı
const DEFAULT_USER: User = {
    id: '1',
    email: 'demo@evalon.com',
    name: 'Demo User',
    createdAt: new Date().toISOString(),
}

export const authService = {
    /**
     * Login with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        if (USE_MOCK_DATA) {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800))

            // Demo account
            if (
                credentials.email === 'demo@evalon.com' &&
                credentials.password === 'demo1234'
            ) {
                const token = 'mock_token_' + Date.now()
                localStorage.setItem(AUTH_TOKEN_KEY, token)
                return { user: DEFAULT_USER, token }
            }

            // Check mock users in localStorage
            const users = this.getMockUsers()
            const user = users.find(
                (u) =>
                    u.email === credentials.email && u.password === credentials.password
            )

            if (user) {
                const token = 'mock_token_' + Date.now()
                localStorage.setItem(AUTH_TOKEN_KEY, token)
                const { password, ...userWithoutPassword } = user
                return { user: userWithoutPassword, token }
            }

            throw new Error('Invalid email or password')
        }

        // Real API call
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token)
        return response.data
    },

    /**
     * Signup with email, password, and name
     */
    async signup(data: SignupData): Promise<AuthResponse> {
        if (USE_MOCK_DATA) {
            await new Promise((resolve) => setTimeout(resolve, 800))

            // Check if email exists
            const users = this.getMockUsers()
            if (users.some((u) => u.email === data.email)) {
                throw new Error('Email already exists')
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                email: data.email,
                password: data.password,
                name: data.name,
                createdAt: new Date().toISOString(),
            }

            users.push(newUser)
            localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))

            const token = 'mock_token_' + Date.now()
            localStorage.setItem(AUTH_TOKEN_KEY, token)

            const { password, ...userWithoutPassword } = newUser
            return { user: userWithoutPassword, token }
        }

        // Real API call
        const response = await apiClient.post<AuthResponse>('/auth/signup', data)
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token)
        return response.data
    },

    /**
     * Logout current user
     */
    logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY)
    },

    /**
     * Get auth token
     */
    getToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN_KEY)
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken()
    },

    /**
     * Get mock users from localStorage
     */
    getMockUsers(): Array<User & { password: string }> {
        const usersJson = localStorage.getItem(MOCK_USERS_KEY)
        return usersJson ? JSON.parse(usersJson) : []
    },
}
