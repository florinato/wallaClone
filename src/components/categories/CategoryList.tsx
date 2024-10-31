import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Category {
  _id: string; // Cambia a `id` si no usas MongoDB
  name: string;
  description?: string; // Si usas description
}

export const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category._id} // Usa `_id` o `id` según lo que retorne la API
              className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
