import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para identificar os dados no cache
export const CACHE_KEYS = {
  USER_TOKEN: 'reuseUserToken',
  USER_DATA: 'reuseUserData',
  FEED_ITEMS: 'reuseFeedItems',
};

// Salva um valor no cache (converte para string JSON)
export const setCache = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Erro ao salvar ${key} no cache:`, e);
  }
};

// Busca um valor do cache (converte de string JSON)
export const getCache = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Erro ao ler ${key} do cache:`, e);
    return null;
  }
};

// Remove itens de sessão
export const clearSessionCache = async () => {
  await AsyncStorage.multiRemove([
    CACHE_KEYS.USER_TOKEN,
    CACHE_KEYS.USER_DATA,
  ]);
};