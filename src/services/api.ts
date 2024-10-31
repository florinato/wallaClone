// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
  
  export const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// Función para obtener un producto específico por su ID
export const fetchProductById = async (productId: number) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

// Función para marcar o desmarcar un producto como favorito
export const toggleFavorite = async (productId: number) => {
  try {
    const response = await api.post(`/products/${productId}/favorite`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling favorite for product ID ${productId}:`, error);
    throw error;
  }
};

// Función para realizar una búsqueda de productos por término
export const searchProducts = async (searchTerm: string) => {
  try {
    const response = await api.get(`/products?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching products with term ${searchTerm}:`, error);
    throw error;
  }
};

export default api;
