// src/components/layout/Header.tsx
import { Bell, Menu, MessageSquare } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Menu className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Wallaclone
            </h1>
          </div>
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <>
                <button onClick={onLogout} className="hover:bg-gray-100 p-2 rounded-full">Logout</button>
                <MessageSquare className="h-6 w-6 text-gray-500" />
              </>
            ) : (
              <>
                <a href="/login" className="hover:bg-gray-100 p-2 rounded-full">Login</a>
                <a href="/register" className="hover:bg-gray-100 p-2 rounded-full">Register</a>
              </>
            )}
            <Bell className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
