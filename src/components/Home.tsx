// src/components/Home.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Product } from '../types';
import { ProductFilters } from './products/ProductFilters';
import { ProductGrid } from './products/ProductGrid';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<{ minPrice?: string; maxPrice?: string; condition?: string }>({});

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', {
        params: {
          search: searchTerm,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          condition: filters.condition,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, filters]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Wallaclone</h2>
      <p className="mb-6">Explora los productos disponibles o utiliza la búsqueda para encontrar algo específico.</p>
      <ProductFilters
        searchTerm={searchTerm}
        onSearch={(term) => setSearchTerm(term)}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />
      <ProductGrid products={products} />
    </div>
  );
};

