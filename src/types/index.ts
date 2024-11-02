// types/index.ts

// types/index.ts
export interface Product {
  _id: number;
  title: string;
  price: number;
  location: string;
  images: string[];  // Cambiamos de `image` a `images` para reflejar el modelo de MongoDB
  description: string;
  tags: string[];  // Etiquetas en lugar de categoría
  condition: 'new' | 'like-new' | 'good' | 'fair';
  seller: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    joinDate: string;
  };
  createdAt: string;
}


export interface User {
  id: string;  // Cambiamos de `number` a `string`
  name: string;
  email: string;
  avatar: string;
  location: string;
  rating: number;
  joinDate: string;
  products: Product[];
}

export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  productId: number;
  content: string;
  timestamp: string;
  read: boolean;
}
