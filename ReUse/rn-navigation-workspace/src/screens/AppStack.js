import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

// Telas Autenticadas (Acessíveis APENAS com Sessão ativa)
const PlaceholderScreen = ({ name }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24 }}>{name}</Text>
        <Text style={{ marginTop: 10 }}>Tela de navegação (Mock)</Text>
    </View>
);

const AppStack = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            tabBarActiveTintColor: '#4CAF50',
        }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} options={{ title: 'Trocas Locais' }} />
      <Tab.Screen name="PostItem" component={() => <PlaceholderScreen name="Cadastrar Item" />} options={{ title: 'Novo Item' }} />
      <Tab.Screen name="Notifications" component={() => <PlaceholderScreen name="Notificações" />} options={{ title: 'Alertas' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

export default AppStack;