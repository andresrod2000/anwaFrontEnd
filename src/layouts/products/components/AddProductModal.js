import { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AddProductModal({ open, handleClose, fetchProductos }) {
  const { token } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    //formData.append("categoria", null);
    formData.append("disponible", disponible);  
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/productosmod/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error.response) {
        console.log(formData)
        console.error("Error en la respuesta:", error.response.data);
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request);
      } else {
        console.error("Error general:", error.message);
      }
    }
    
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in">
        {/* Encabezado visual naranja */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🛍️ Nuevo Producto</h2>
            <button
              onClick={handleClose}
              className="text-white text-2xl hover:text-gray-100 font-bold"
            >
              &times;
            </button>
          </div>
          <p className="text-sm mt-1 opacity-90">Completa los datos para registrar el producto</p>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del Producto"
              className="input-style"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <textarea
              placeholder="Descripción"
              className="input-style col-span-full"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio ($)"
              className="input-style"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <input
              type="text"
              placeholder="Categoría"
              className="input-style"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
            <div className="col-span-full">
              <label>
                <input
                  type="checkbox"
                  checked={disponible}
                  onChange={(e) => setDisponible(e.target.checked)}
                />
                Disponible
              </label>
            </div>
            <input
              type="file"
              className="input-style"
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
            >
              Guardar Producto
            </button>
          </div>
        </div>
      </div>

      {/* Estilos reutilizables */}
      <style>
        {`
          .input-style {
            @apply border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm;
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchProductos: PropTypes.func.isRequired,
};

export default AddProductModal;
