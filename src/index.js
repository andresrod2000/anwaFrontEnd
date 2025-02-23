import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import { AuthProvider } from "./context/AuthContext"; // ✅ Importa AuthProvider correctamente

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider> {/* ✅ Ahora toda la aplicación tiene acceso al contexto de autenticación */}
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </AuthProvider>
  </BrowserRouter>
);
