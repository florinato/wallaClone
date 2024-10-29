import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="bg-white shadow-sm px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="w-full pl-10 pr-24 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5 text-gray-500 hover:text-gray-700">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">España</span>
          </button>
        </div>
      </div>
    </div>
  );
};