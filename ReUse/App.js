import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AuthStack from './src/screens/AuthStack';
import AppStack from './src/screens/AppStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Componente que decide qual Stack mostrar (Guarda de Rota)
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  
  // 🔑 [Autenticação e Sessões - 20%]
  // Se estiver autenticado, mostra o AppStack. Caso contrário, mostra o AuthStack (Login)
  return isAuthenticated ? <AppStack /> : <AuthStack />;
};

// Componente Principal
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;