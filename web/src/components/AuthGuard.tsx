import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number; // Tempo de expiração em segundos desde o Unix epoch
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = Cookies.get('jwt');
  const location = useLocation();

  if (!token) {
    Cookies.set('redirectTo', location.pathname, { expires: 1 }); // Expira em 1 dia
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos

    if (decoded.exp < currentTime) {
      Cookies.remove('jwt'); // Remove o token expirado
      Cookies.set('redirectTo', location.pathname, { expires: 1 });
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    Cookies.remove('jwt'); // Remove o token inválido
    return <Navigate to="/login" replace />;
  }

  return children;
}