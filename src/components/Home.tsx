// Archivo: src/components/Home.tsx

import { useEffect, useState } from 'react';
import api from '../services/api';
import { Product } from '../types';
import { ProductFilters } from './products/ProductFilters';
import { ProductGrid } from './products/ProductGrid';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<{ minPrice?: string; maxPrice?: string; condition?: string }>({});
  const [appliedFilters, setAppliedFilters] = useState<{ minPrice?: string; maxPrice?: string; condition?: string }>({});

  const fetchProducts = async (appliedFilters: { minPrice?: string; maxPrice?: string; condition?: string }) => {
    try {
      const response = await api.get('/products', {
        params: {
          search: searchTerm,
          minPrice: appliedFilters.minPrice,
          maxPrice: appliedFilters.maxPrice,
          condition: appliedFilters.condition,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(appliedFilters);
  }, [appliedFilters]);

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Wallaclone</h2>
      <p className="mb-6">Explora los productos disponibles o utiliza la búsqueda para encontrar algo específico.</p>
      <ProductFilters
        searchTerm={searchTerm}
        onSearch={(term) => setSearchTerm(term)}
        onFilterChange={(newFilters) => setFilters(newFilters)}
        onApplyFilters={handleSearch}
      />
      <ProductGrid products={products} />
    </div>
  );
};

