//products/ProductGrid.tsx
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onFavoriteClick: (productId: number) => void;
}

export const ProductGrid = ({ products, onFavoriteClick }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
};