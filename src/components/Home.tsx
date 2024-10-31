// src/components/Home.tsx
import { Product } from '../types';
import { ProductGrid } from './products/ProductGrid';
import { SearchBar } from './search/SearchBar';

interface HomeProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Home = ({ products, searchTerm, onSearchChange }: HomeProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Wallaclone</h2>
      <p className="mb-6">Explora los productos disponibles o utiliza la búsqueda para encontrar algo específico.</p>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <ProductGrid products={products} />
    </div>
  );
};

