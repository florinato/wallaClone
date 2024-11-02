// src/components/products/ProductCard.tsx
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  // Asegúrate de que `product._id` esté siendo pasado en la ruta
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)} // Cambia `product._id` si el ID está guardado como `_id` en el modelo
    >
      {/* Imagen del producto */}
      <div className="relative pb-[100%]">
        <img
          src={`/uploads/${product.images[0]}`}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Información del producto */}
      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 mb-1">{product.title}</h3>
        <p className="text-lg font-bold text-green-600">{product.price}€</p>
        <div className="flex items-center gap-2 mt-3 text-gray-500">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{product.location}</span>
        </div>
      </div>
    </div>
  );
};


