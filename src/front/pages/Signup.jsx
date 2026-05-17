import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      navigate('/');
    } else {
      setErrorMessage("Error al registrar usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>

          {errorMessage && (
            <div className="alert alert-danger py-2 font-size-14 text-center" style={{ fontSize: '14px' }}>
              {errorMessage}
            </div>
          )}

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
          <button type="submit" className="auth-btn btn btn-success">
            Registrarse
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/" className="btn btn-link">
            Volver al Inicio de Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};