//products/ProductCard.tsx
import { Heart, MapPin } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onFavoriteClick: (productId: number) => void;
}

export const ProductCard = ({ product, onFavoriteClick }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative pb-[100%]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
          onClick={() => onFavoriteClick(product.id)}
        >
          <Heart className="h-5 w-5 text-gray-500" />
        </button>
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