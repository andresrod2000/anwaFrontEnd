import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("access_token") || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No autorizado`);
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("⚠️ Error obteniendo usuario:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (correo, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/token/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciales inválidas");
            }

            const data = await response.json();
            //console.log("🔑 Token obtenido en login:", data.access);
            localStorage.setItem("access_token", data.access);
            setToken(data.access);  // ✅ Se actualiza el estado del token
            fetchUser(data.access);
        } catch (error) {
            console.error("⚠️ Error en login:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
