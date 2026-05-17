import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/">Mi gran Aplicación</Link>
            <div className="ml-auto">
                {!token ? (
                    <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
                ) : (
                    <button onClick={handleLogout} className="btn className=btn-danger">
                        Cerrar sesión
                    </button>
                )}
            </div>
        </nav>
    );
};