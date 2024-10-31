// src/components/auth/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface RegisterProps {
  onRegister: () => void;
}

export const Register = ({ onRegister }: RegisterProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      localStorage.setItem('token', response.data.token); // Guarda el token en el almacenamiento local
      onRegister(); // Actualiza el estado de autenticación
      setMessage(`Registro exitoso: Bienvenido, ${response.data.user.name}`);
      navigate('/'); // Redirige al Home después de registrarse
    } catch (error) {
      setMessage('Error en el registro. Intenta con otros datos.');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="register-form max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="input-field" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="input-field" required />
        <input type="text" name="location" placeholder="Ubicación" value={formData.location} onChange={handleChange} className="input-field" required />
        <button type="submit" className="submit-btn">Registrar</button>
      </form>
      {message && <p className="message text-center mt-4">{message}</p>}
    </div>
  );
};
