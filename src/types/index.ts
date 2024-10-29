export interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
  category: string;
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

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  location: string;
  rating: number;
  joinDate: string;
  products: Product[];
  favorites: Product[];
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  productId: number;
  content: string;
  timestamp: string;
  read: boolean;
}