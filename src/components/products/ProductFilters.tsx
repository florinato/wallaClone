// src/components/products/ProductFilters.tsx
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface ProductFiltersProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onFilterChange: (filters: { minPrice?: string; maxPrice?: string; condition?: string }) => void;
}

export const ProductFilters = ({ searchTerm, onSearch, onFilterChange }: ProductFiltersProps) => {
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', condition: '' });
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  // Llamada para sugerencias de etiquetas
  const fetchSuggestions = async (term: string) => {
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await api.get(`/products/tags?search=${term}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar productos"
        className="border p-2 flex-grow mr-2 w-full md:w-1/3"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 rounded shadow-md max-h-40 overflow-y-auto w-full md:w-1/3 z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                onSearch(suggestion);
                setSuggestions([]); // Ocultar las sugerencias tras seleccionar una
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleSearch}
        className="bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition"
      >
        Buscar
      </button>
      <input
        type="text"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        placeholder="Precio mínimo"
        className="border p-2 mr-2 w-full md:w-auto"
      />
      <input
        type="text"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        placeholder="Precio máximo"
        className="border p-2 mr-2 w-full md:w-auto"
      />
      <select
        name="condition"
        value={filters.condition}
        onChange={handleInputChange}
        className="border p-2 mr-2 w-full md:w-auto"
      >
        <option value="">Condición</option>
        <option value="new">Nuevo</option>
        <option value="like-new">Como Nuevo</option>
        <option value="good">Bueno</option>
        <option value="fair">Aceptable</option>
      </select>
    </div>
  );
};

