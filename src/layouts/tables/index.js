import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Tables() {
  const [columns] = useState([
    { name: "Nombre", accessor: "nombre" },
    { name: "Correo", accessor: "correo" },
    { name: "Rol", accessor: "rol" },
  ]);

  const { token } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/usuarios/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        setRows(
          data.map((user) => ({
            nombre: user.nombre ? user.nombre.toUpperCase() : "SIN NOMBRE",
            correo: user.correo || "SIN CORREO",
            rol: obtenerRol(user.rol),
          }))
        );
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const obtenerRol = (rol) => {
    switch (rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Editor";
      case 3:
        return "Usuario";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Tabla Usuarios</h2>
          </div>

          <div className="overflow-x-auto">
            {rows.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.accessor}
                        className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {columns.map((col) => (
                        <td key={col.accessor} className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {row[col.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-gray-500">Cargando datos...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
