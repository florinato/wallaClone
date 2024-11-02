// src/components/search/SearchBar.tsx
import { useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onApplyFilters: (filters: { price?: number; condition?: string }) => void;
}

export const SearchBar = ({ searchTerm, onSearchChange, onApplyFilters }: SearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ price: 0, condition: '' });

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setShowFilters(false);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar productos..."
        className="search-input"
      />
      <button onClick={handleToggleFilters} className="filter-button">
        Filtros
      </button>
      
      {showFilters && (
        <div className="filters-dropdown">
          <div>
            <label>Precio máximo</label>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label>Condición</label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
            >
              <option value="">Seleccionar</option>
              <option value="new">Nuevo</option>
              <option value="like-new">Como Nuevo</option>
              <option value="good">Bueno</option>
              <option value="fair">Aceptable</option>
            </select>
          </div>
          <button onClick={handleApplyFilters}>Aplicar filtros</button>
        </div>
      )}
    </div>
  );
};
