import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// 🔑 Tela de Login (Autenticação e Sessões)
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('teste@reuse.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Erro de Login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ReUse!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.button} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} color="#4CAF50" />
      )}
      
      <Button 
        title="Não tem conta? Cadastre-se" 
        onPress={() => Alert.alert('Navegação', 'Ir para tela de cadastro')} 
        color="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f0f0' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 5 },
  subtitle: { textAlign: 'center', marginBottom: 30, color: '#666' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff' },
  button: { marginTop: 15, marginBottom: 10 },
});

export default LoginScreen;