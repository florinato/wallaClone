// src/components/products/ProductCard.tsx
import { MapPin } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = `http://localhost:3000/${product.image?.[0]}`; // Construye la URL completa

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative pb-[100%]">
        <img
          src={imageUrl}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800">{product.title}</h3>
        <p className="text-lg font-bold text-gray-900 mt-1">{product.price}€</p>
        <div className="flex items-center gap-1 mt-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">{product.location}</span>
        </div>
      </div>
    </div>
  );
};

