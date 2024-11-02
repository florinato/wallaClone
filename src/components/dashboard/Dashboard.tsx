// src/components/dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

export const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await api.get('/products/my-products'); // Actualizado para obtener solo los productos del usuario
        setProducts(response.data || []); // Ajustado según el formato esperado
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };
    fetchUserProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Productos</h2>
      <button className="submit-btn mb-6">Añadir Producto</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} /> // Eliminado `onFavoriteClick`
        ))}
      </div>
    </div>
  );
};
