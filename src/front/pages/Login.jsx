import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('token', data.access_token);
      navigate('/private');
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Inicio de Sesión</h2>
          <input 
            type="email" 
            className="auth-input"
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="auth-input"
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="auth-btn btn btn-primary">
            Ingresar
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿No tienes una cuenta?</p>
          <Link to="/signup" className="btn btn-link">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};