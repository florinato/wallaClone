// src/components/products/UploadProduct.tsx
import { useState } from 'react';
import api from '../../services/api';

export const UploadProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    tags: '',
    condition: 'new',
    location: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  // Maneja los cambios de texto en los campos de entrada
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Maneja la carga de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convierte FileList a Array
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', String(formData.price));
    formDataToSend.append('tags', formData.tags);
    formDataToSend.append('condition', formData.condition);
    formDataToSend.append('location', formData.location);

    images.forEach((image) => {
      formDataToSend.append(`images`, image); // Añade cada imagen al formData
    });

    try {
      const response = await api.post('/products', formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setMessage(`Producto creado exitosamente: ${response.data.title}`);
    } catch (error) {
      console.error("Error en subida:", error);
      setMessage('Error al crear el producto. Intenta nuevamente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Subir Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-gray-700">Título del Producto</label>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />
        
        <label className="block text-gray-700">Descripción</label>
        <textarea
          name="description"
          placeholder="Descripción detallada del producto"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md h-32 resize-none"
        />

        <label className="block text-gray-700">Precio</label>
        <input
          type="number"
          name="price"
          placeholder="Precio en EUR"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <label className="block text-gray-700">Etiquetas</label>
        <input
          type="text"
          name="tags"
          placeholder="Ejemplo: tecnología, libro, ropa (separadas por comas)"
          value={formData.tags}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <label className="block text-gray-700">Condición</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        >
          <option value="new">Nuevo</option>
          <option value="like-new">Como Nuevo</option>
          <option value="good">Bueno</option>
          <option value="fair">Aceptable</option>
        </select>

        <label className="block text-gray-700">Ubicación</label>
        <input
          type="text"
          name="location"
          placeholder="Ciudad o Región"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <label className="block text-gray-700">Imágenes del Producto</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border rounded-md"
        />

        <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold mt-4">
          Subir Producto
        </button>
      </form>
      {message && <p className="text-center mt-4 text-teal-500 font-bold">{message}</p>}
    </div>
  );
};
