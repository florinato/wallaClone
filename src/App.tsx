import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { CategoryList } from './components/categories/CategoryList';
import { ProductGrid } from './components/products/ProductGrid';
import { BottomNav } from './components/layout/BottomNav';
import { products as initialProducts } from './data/mockData';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState(initialProducts);

  const handleFavoriteClick = (productId: number) => {
    console.log('Favorite clicked:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16"> {/* Ajuste del padding top para el header fijo */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryList />
        <main className="max-w-6xl mx-auto px-4 py-6 mb-20"> {/* Añadido mb-20 para el espacio del BottomNav */}
          <ProductGrid products={products} onFavoriteClick={handleFavoriteClick} />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;