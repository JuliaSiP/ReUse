import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert, RefreshControl, Image } from 'react-native';
import { getCache, setCache, CACHE_KEYS } from '../utils/cache';
import { getRandomInspiration } from '../api/api'; 
// import api from '../api/api'; // Importado para simular requisição autenticada

// Mock: Simula a busca de itens de troca do backend (requer JWT)
const fetchFeedItems = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { id: '1', title: 'Livro de Programação Usado', user: 'Julia S.', distance: '2km', isCached: false },
    { id: '2', title: 'Kit de Jardinagem Completo', user: 'Esteves J.', distance: '5km', isCached: false },
    { id: '3', title: 'Cadeira de Escritório', user: 'Pablo U.', distance: '1km', isCached: false },
  ];
};

// 💸 Tela de Feed (Consumo de APIs + Caching Local)
const FeedScreen = () => {
  const [items, setItems] = useState([]);
  const [inspiration, setInspiration] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para carregar itens com estratégia de Caching
  const loadFeed = useCallback(async () => {
    setLoading(true);
    
    // 1. Tenta carregar dados do cache (Carregamento Rápido/Offline)
    const cachedItems = await getCache(CACHE_KEYS.FEED_ITEMS);
    if (cachedItems) {
      setItems(cachedItems.map(item => ({ ...item, isCached: true })));
    }

    // 2. Busca os dados mais recentes da API
    try {
      const [apiItems, inspirationData] = await Promise.all([
          fetchFeedItems(), // Requisição que exige Sessão/JWT
          getRandomInspiration() // Consumo de API Externa: The Cat API
      ]);
      
      // 3. Atualiza o cache e o estado se os dados forem novos
      if (JSON.stringify(apiItems) !== JSON.stringify(cachedItems)) {
        setItems(apiItems.map(item => ({ ...item, isCached: false })));
        await setCache(CACHE_KEYS.FEED_ITEMS, apiItems);
      }

      if (inspirationData && inspirationData.length > 0) {
        setInspiration(inspirationData[0]); 
      }

    } catch (error) {
      console.error('Erro ao buscar feed/inspiração:', error);
      if (!cachedItems) {
         Alert.alert('Erro', 'Não foi possível carregar o feed. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDetails}>
        Troca por: {item.user} ({item.distance}) 
        {item.isCached && <Text style={{ color: 'orange' }}> (Cache Antigo)</Text>}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feed de Itens para Troca</Text>
      
      {inspiration && (
        <View style={styles.inspirationBox}>
            <Text style={styles.inspirationText}>Inspiração do Dia (API Externa - The Cat API):</Text>
            <Text style={styles.inspirationLink}>ID: {inspiration.id}</Text>
            <Image source={{ uri: inspiration.imageUrl }} style={styles.inspirationImage} />
        </View>
      )}

      {loading && items.length === 0 ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadFeed} colors={['#4CAF50']} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  itemCard: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemDetails: { fontSize: 14, color: '#666' },
  inspirationBox: { borderWidth: 1, borderColor: '#4CAF50', padding: 10, marginVertical: 10, borderRadius: 8, alignItems: 'center' },
  inspirationText: { color: '#4CAF50', fontWeight: 'bold' },
  inspirationLink: { fontSize: 12, color: '#007BFF', marginVertical: 5 },
  inspirationImage: { width: 150, height: 150, borderRadius: 75, resizeMode: 'cover', marginVertical: 5 }
});

export default FeedScreen;