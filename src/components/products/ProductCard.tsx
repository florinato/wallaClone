// src/components/products/ProductCard.tsx
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  // Asegúrate de que `product._id` esté siendo pasado en la ruta
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)} // Cambia `product._id` si el ID está guardado como `_id` en el modelo
    >
      <div className="relative pb-[100%]">
        <img
          src={`/uploads/${product.images[0]}`}
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


