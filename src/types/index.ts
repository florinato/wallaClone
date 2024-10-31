// types/index.ts

// types/index.ts
export interface Product {
  _id: string; // Cambiado de `id` a `_id`
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
  tags: string[];
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
