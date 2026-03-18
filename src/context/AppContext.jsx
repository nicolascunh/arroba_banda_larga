import React, { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ─── Logged user ──────────────────────────────
  const [user, setUser] = useState(null)

  // ─── Toast notifications ──────────────────────
  const [toast, setToast] = useState(null)

  // ─── Mobile sidebar state ─────────────────────
  const [sideOpen, setSide] = useState(false)

  // ─── Navigation ───────────────────────────────
  const navigate = useNavigate()

  // ─── Actions ──────────────────────────────────
  const showToast = useCallback((msg, ms = 3200) => {
    setToast(msg)
    setTimeout(() => setToast(null), ms)
  }, [])

  const doLogin = useCallback((userObj) => {
    setUser(userObj)
    navigate('/portal/dashboard')
  }, [navigate])

  const doLogout = useCallback(() => {
    setUser(null)
    setSide(false)
    navigate('/')
  }, [navigate])

  return (
    <AppContext.Provider
      value={{
        // state
        user, setUser,
        toast,
        sideOpen, setSide,
        // actions
        showToast,
        doLogin,
        doLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
