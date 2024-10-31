// src/components/layout/BottomNav.tsx
import { Home, PlusCircle, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BottomNavProps {
  isAuthenticated?: boolean;
}

export const BottomNav = ({ isAuthenticated = false }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center gap-1 p-2">
            <Home className="h-6 w-6 text-teal-500" />
            <span className="text-xs text-gray-600">Inicio</span>
          </Link>
          <Link to="/explore" className="flex flex-col items-center gap-1 p-2">
            <Tag className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">Explorar</span>
          </Link>
          <Link to={isAuthenticated ? "/upload" : "/login"} className="flex flex-col items-center -mt-8">
            <div className="bg-teal-500 rounded-full p-3 shadow-lg">
              <PlusCircle className="h-8 w-8 text-white" />
            </div>
            <span className="text-xs text-gray-600 mt-1">Subir</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 p-2">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-600">{isAuthenticated ? "Perfil" : "Login"}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

