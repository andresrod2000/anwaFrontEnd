import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(correo.toLowerCase(), password); // Espera a que el login termine
            setTimeout(() => navigate("/dashboard"), 500); // Redirige con un pequeño retraso
        } catch (error) {
            setError("Credenciales incorrectas, intenta nuevamente.");
        }
    };
    

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px" }}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <button type="submit" style={{ width: "100%", padding: "10px", background: "#007bff", color: "white" }}>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
