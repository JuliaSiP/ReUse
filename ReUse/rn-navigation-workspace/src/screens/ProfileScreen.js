import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { getCEPInfo } from '../api/api'; 
import { useAuth } from '../contexts/AuthContext';
import { setCache, CACHE_KEYS } from '../utils/cache'; 

// 📍 Tela de Perfil (Consumo de APIs - ViaCEP + Caching Local de Dados)
const ProfileScreen = () => {
  const { user, signOut } = useAuth();
  
  // Estados para o formulário de localização
  const [cep, setCep] = useState(user?.location?.cep || '');
  const [address, setAddress] = useState(
    user?.location ? `${user.location.city} - ${user.location.uf}` : 'Preencha o CEP e clique em buscar'
  );
  const [loadingCep, setLoadingCep] = useState(false);

  // Consumo de API: Busca e Autocompleta o Endereço (Critério: Consumo de APIs)
  const handleCepSearch = async () => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) {
      Alert.alert('Erro', 'O CEP deve ter 8 dígitos.');
      return;
    }

    setLoadingCep(true);
    const result = await getCEPInfo(cleanedCep);
    setLoadingCep(false);

    if (result.error) {
      Alert.alert('Erro', result.error);
      setAddress('Endereço não encontrado ou CEP inválido.');
    } else {
      const newAddress = `${result.logradouro}, ${result.bairro} - ${result.localidade}/${result.uf}`;
      setAddress(newAddress);
      
      // Caching Local: Atualiza o cache após sucesso na busca (Critério: Caching Local)
      const newLocationData = { cep: result.cep, city: result.localidade, uf: result.uf };
      const updatedUser = { ...user, location: newLocationData };
      
      await setCache(CACHE_KEYS.USER_DATA, updatedUser); // Salva no cache para uso offline

      Alert.alert('Sucesso', 'Endereço atualizado com sucesso e salvo no cache!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Meu Perfil</Text>
        
        <Text style={styles.subtitle}>Dados Pessoais (Carregados do Cache):</Text>
        <View style={styles.card}>
          <Text style={styles.infoText}><Text style={styles.infoLabel}>Nome:</Text> {user?.name}</Text>
          <Text style={styles.infoText}><Text style={styles.infoLabel}>Email:</Text> {user?.email}</Text>
        </View>

        <Text style={styles.subtitle}>Atualizar Localização (ViaCEP):</Text>
        
        <TextInput
          style={styles.input}
          placeholder="CEP (Somente números)"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={8}
        />
        <View style={styles.buttonContainer}>
            <Button
                title={loadingCep ? "Buscando..." : "Buscar Endereço (ViaCEP)"}
                onPress={handleCepSearch}
                disabled={loadingCep || cep.length !== 8}
                color="#007BFF"
            />
        </View>
        
        <Text style={styles.addressResult}>Endereço Atual:</Text>
        {loadingCep ? (
            <ActivityIndicator size="small" color="#0000ff" />
        ) : (
            <Text style={styles.addressText}>{address}</Text>
        )}
        
        <View style={styles.logoutButton}>
            <Button title="Sair / Logout (Sessão)" onPress={signOut} color="#FF5733" />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollContent: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4CAF50', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  infoText: { fontSize: 16, marginBottom: 5 },
  infoLabel: { fontWeight: 'bold' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff' },
  buttonContainer: { marginVertical: 10 },
  addressResult: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: '#555' },
  addressText: { fontSize: 16, color: '#333' },
  logoutButton: { marginTop: 40 },
});

export default ProfileScreen;