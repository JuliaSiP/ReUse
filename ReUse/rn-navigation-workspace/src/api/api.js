import axios from 'axios';
import { getCache, CACHE_KEYS } from '../utils/cache';

// 1. Configuração do Axios para o Backend (Mock para ReUse!)
const api = axios.create({
  baseURL: 'https://api.reuseapp.com.br/v1', // URL do seu backend
  timeout: 10000,
});

// INTERCEPTOR: Adiciona o token JWT em TODAS as requisições autenticadas.
api.interceptors.request.use(async (config) => {
  const token = await getCache(CACHE_KEYS.USER_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// === FUNÇÕES DE CONSUMO DE APIS EXTERNAS ===

// A. API Pública: ViaCEP (Consumo de APIs - 60%)
export const getCEPInfo = async (cep) => {
  const cleanedCep = cep.replace(/\D/g, '');
  if (cleanedCep.length !== 8) {
    return { error: 'CEP inválido' };
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    if (response.data.erro) {
      return { error: 'CEP não encontrado' };
    }
    return response.data; // Retorna logradouro, bairro, localidade, uf
  } catch (error) {
    return { error: 'Falha na conexão com a API ViaCEP' };
  }
};

// B. API Pública: The Cat API (Exemplo de inspiração - Consumo de APIs - 60%)
export const getRandomInspiration = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=3'); 
    return response.data.map(cat => ({
      id: cat.id,
      imageUrl: cat.url,
      title: 'Item de Inspiração (Gato)',
    }));
  } catch (error) {
    return [];
  }
};


// === FUNÇÃO DE AUTENTICAÇÃO (MOCK) ===

export const loginUser = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); 

  if (email === 'teste@reuse.com' && password === '123456') {
    return {
      token: 'jwt.token.mock.1234567890', 
      user: {
        id: 1,
        name: 'Julia da Silva',
        email: email,
        location: { cep: '01001000', city: 'São Paulo', uf: 'SP' }
      }
    };
  } else {
    throw new Error('Credenciais inválidas. Use teste@reuse.com / 123456');
  }
};

export default api;