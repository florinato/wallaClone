// App.tsx
import { useEffect, useState } from 'react';
import { CategoryList } from './components/categories/CategoryList';
import { BottomNav } from './components/layout/BottomNav';
import { Header } from './components/layout/Header';
import { ProductGrid } from './components/products/ProductGrid';
import { SearchBar } from './components/search/SearchBar';
import api from './services/api';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener productos desde la API (o productos filtrados según el searchTerm)
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products); // Asegúrate de que la API devuelve un array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [searchTerm]); // opcional: depender de `searchTerm` si deseas hacer la búsqueda

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryList />
        <main className="max-w-6xl mx-auto px-4 py-6 mb-20">
          <ProductGrid products={products} onFavoriteClick={(id) => console.log(`Favorito: ${id}`)} />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;


