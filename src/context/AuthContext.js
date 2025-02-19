import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                localStorage.removeItem("access_token");
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        }
        setLoading(false);
    };

    const login = async (correo, password) => {
        const response = await fetch("https://anwabackend.duckdns.org/api/token/", {  // ✅ Asegurar URL correcta
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("access_token", data.access);
            fetchUser(data.access);
        } else {
            throw new Error("Credenciales inválidas");
        }
    };
    

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validación de propTypes
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea un nodo de React
};

export default AuthContext;
