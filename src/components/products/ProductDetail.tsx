// src/components/products/ProductDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Product } from '../../types';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">{product.price}€</p>
      <p className="text-gray-600 mb-6">Ubicación: {product.location}</p>
      
      {/* Galería de imágenes */}
      {product.images && product.images.length > 0 && (
        <div className="flex overflow-x-auto gap-4 mb-6">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`/uploads/${image}`}
              alt={`${product.title} - Imagen ${index + 1}`}
              className="h-48 w-auto object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-2">Detalles del Producto</h3>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Condición: {product.condition}</li>
          <li>Etiquetas: {product.tags.join(', ')}</li>
          {/* Puedes agregar otros detalles aquí si los tienes */}
        </ul>
      </div>
    </div>
  );
};

