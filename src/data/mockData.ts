import { Product, Category, User } from '../types';

export const products: Product[] = [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    price: 799,
    location: "Madrid",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400",
    description: "Perfecto estado, solo 1 año de uso. Color grafito, 256GB.",
    category: "Electrónica",
    condition: "like-new",
    seller: {
      id: 1,
      name: "Ana García",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      rating: 4.8,
      joinDate: "2022-01-15"
    },
    createdAt: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Bicicleta Mountain Bike",
    price: 299,
    location: "Barcelona",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=400",
    description: "Bicicleta montaña Trek Marlin 7. Talla M. Poco uso.",
    category: "Deportes",
    condition: "good",
    seller: {
      id: 2,
      name: "Carlos Ruiz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      rating: 4.6,
      joinDate: "2023-05-20"
    },
    createdAt: "2024-03-14T15:45:00Z"
  },
  {
    id: 3,
    title: "Nintendo Switch OLED",
    price: 280,
    location: "Valencia",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=400",
    description: "Nintendo Switch OLED en perfecto estado. Incluye 2 juegos.",
    category: "Electrónica",
    condition: "like-new",
    seller: {
      id: 3,
      name: "Laura Martínez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
      rating: 4.9,
      joinDate: "2023-08-10"
    },
    createdAt: "2024-03-13T09:15:00Z"
  }
];

export const categories: Category[] = [
  { id: "electronics", name: "Electrónica", icon: "smartphone" },
  { id: "fashion", name: "Moda", icon: "shirt" },
  { id: "home", name: "Hogar", icon: "home" },
  { id: "sports", name: "Deportes", icon: "dumbbell" },
  { id: "cars", name: "Motor", icon: "car" },
  { id: "real-estate", name: "Inmobiliaria", icon: "building" }
];

export const currentUser: User = {
  id: 1,
  name: "Ana García",
  email: "ana@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
  location: "Madrid",
  rating: 4.8,
  joinDate: "2022-01-15",
  products: [],
  favorites: []
};