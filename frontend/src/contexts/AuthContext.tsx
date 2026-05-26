import * as React from "react"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "admin" | "gestor" | "funcionario"
  nivel: number
  points?: number
  position?: string
  gestorId?: string | null
  must_change_password?: boolean
  [key: string]: any
}

interface AuthContextState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  mustChangePassword: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
  updateUser: (updates: Partial<AuthUser>) => void
}

const AuthContext = React.createContext<AuthContextState | undefined>(undefined)

function getStoredUser(): AuthUser | null {
  try {
    const userJson = localStorage.getItem("azis_user")
    if (!userJson) return null
    return JSON.parse(userJson) as AuthUser
  } catch (error) {
    console.error("AuthContext getStoredUser error:", error)
    return null
  }
}

function getStoredToken(): string | null {
  return localStorage.getItem("azis_token")
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(getStoredToken())
  const [user, setUser] = React.useState<AuthUser | null>(getStoredUser())

  React.useEffect(() => {
    if (token) {
      localStorage.setItem("azis_token", token)
    } else {
      localStorage.removeItem("azis_token")
    }
  }, [token])

  React.useEffect(() => {
    if (user) {
      localStorage.setItem("azis_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("azis_user")
    }
  }, [user])

  const login = React.useCallback((newToken: string, newUser: AuthUser) => {
    setToken(newToken)
    setUser(newUser)
  }, [])

  const logout = React.useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = React.useCallback((updates: Partial<AuthUser>) => {
    setUser((current) => (current ? { ...current, ...updates } : current))
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      mustChangePassword: Boolean(user?.must_change_password),
      login,
      logout,
      updateUser,
    }),
    [token, user, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
