"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  username: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, role: string, id: number, username: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<String | null>(null)
  const router = useRouter()

  useEffect(() => {
    // استعادة البيانات عند تحديث الصفحة
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("role")
    const storedId = localStorage.getItem("id")
    const storedUsername = localStorage.getItem("username")

    if (storedToken && storedRole && storedId) {
      setToken(storedToken)
      setUser({
        id: parseInt(storedId),
        role: storedRole,
        username: storedUsername || "",
      })
    }
  }, [])

  const login = (newToken: string, role: string, id: number, username: string) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("role", role)
    localStorage.setItem("id", id.toString())
    localStorage.setItem("username", username)

    setToken(newToken)
    setUser({ id, role, username })
    
    // التوجيه حسب الدور (اختياري، حالياً نرسل الكل للرئيسية)
    router.push("/")
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    setToken(null)
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token: token as string, 
        login, 
        logout, 
        isAuthenticated: !!token 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}