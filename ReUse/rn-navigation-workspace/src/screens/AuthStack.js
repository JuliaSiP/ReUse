import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
// import RegisterScreen from './RegisterScreen'; // Adicionar se necessário

const Stack = createNativeStackNavigator();

// Telas Não Autenticadas (Acessíveis ANTES do Login)
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;