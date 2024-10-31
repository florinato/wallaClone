// src/components/auth/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Guarda el token en el almacenamiento local
      onLogin(); // Actualiza el estado de autenticación
      navigate('/'); // Redirige al Home después de iniciar sesión
    } catch (error) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded font-semibold">
          Entrar
        </button>
      </form>
    </div>
  );
};
