import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCache, setCache, clearSessionCache, CACHE_KEYS } from '../utils/cache';
import { loginUser } from '../api/api'; 
import { ActivityIndicator, View } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar Sessão ao Iniciar o App (Caching Local)
  useEffect(() => {
    const loadSession = async () => {
      const token = await getCache(CACHE_KEYS.USER_TOKEN);
      const userData = await getCache(CACHE_KEYS.USER_DATA);
      
      if (token && userData) {
        setUser(userData);
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  // Lógica de Login (Autenticação e Sessões)
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { token, user: loggedUser } = await loginUser(email, password);

      await setCache(CACHE_KEYS.USER_TOKEN, token);
      await setCache(CACHE_KEYS.USER_DATA, loggedUser);

      setUser(loggedUser);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      throw new Error(error.message || 'Erro no login.');
    }
  };

  // Lógica de Logout
  const signOut = async () => {
    await clearSessionCache(); // Remove token e dados do usuário do cache
    setUser(null);
  };

  // Garante que o app só carregue após a verificação do cache
  if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#4CAF50" />
          </View>
      );
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);