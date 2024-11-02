// src/App.tsx
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { Home } from './components/Home';
import { BottomNav } from './components/layout/BottomNav';
import { Header } from './components/layout/Header';
import { PrivateRoute } from './components/PrivateRoute';
import { ProductDetail } from './components/products/ProductDetail';
import { UploadProduct } from './components/products/UploadProduct';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="pt-16">
          <main className="max-w-6xl mx-auto px-4 py-6 mb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
              />
              <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleLogin} />}
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <UploadProduct />
                  </PrivateRoute>
                }
              />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
        <BottomNav isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  );
}

export default App;
