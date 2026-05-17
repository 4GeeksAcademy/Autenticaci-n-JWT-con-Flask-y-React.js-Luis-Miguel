import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            navigate('/');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    if (!isAuthenticated) return null;

    return (
        <div className="private-page-container">
            <div className="private-welcome-card">
                <h1 className="welcome-title">¡Área Privada Desbloqueada!</h1>
                
                <div className="celebration-emoji-container">
                    <span role="img" aria-label="Trofeo de Éxito" className="celebration-emoji">
                        🏆✨
                    </span>
                </div>

                <div className="welcome-message-area">
                    <p className="message-highlight">Nueva área descubierta! 🎉</p>
                    <p className="message-subtext">Lo has logrado</p>
                    <p className="message-subtext">Seguimos codeando, vamos a por todas.</p>
                </div>

                <div className="logout-action-area">
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger logout-btn"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};