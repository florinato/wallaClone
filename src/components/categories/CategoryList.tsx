import React from 'react';
import { categories } from '../../data/mockData';

export const CategoryList = () => {
  return (
    <div className="bg-white px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
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