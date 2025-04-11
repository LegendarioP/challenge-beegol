import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom'

export function AuthGuard({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('jwt')
  const location = useLocation()
  if (!token) {
    localStorage.setItem('redirectTo', location.pathname)
    return <Navigate to="/login" replace />
  }

  return children
}