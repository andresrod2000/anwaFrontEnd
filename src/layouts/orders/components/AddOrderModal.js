import { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AddOrderModal({ open, handleClose, fetchOrders }) {
  const { token } = useContext(AuthContext);

  const [nombreCliente, setNombreCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [detallesPedido, setDetallesPedido] = useState("");
  const [total, setTotal] = useState("");

  const handleSubmit = async () => {
    try {
      const newOrder = {
        nombre_cliente: nombreCliente,
        telefono,
        direccion_domicilio: direccion,
        metodo_pago: metodoPago,
        estado_pedido: "recibido",
        detalles_pedido: detallesPedido,
        total,
        comentarios: "",
      };

      await axios.post(`${API_BASE_URL}/api/pedidos/`, newOrder, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOrders();
      handleClose();
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in">
        {/* Encabezado visual naranja */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🍽️ Nuevo Pedido</h2>
            <button
              onClick={handleClose}
              className="text-white text-2xl hover:text-gray-100 font-bold"
            >
              &times;
            </button>
          </div>
          <p className="text-sm mt-1 opacity-90">Completa los datos para registrar el pedido</p>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del Cliente"
              className="input-style"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teléfono"
              className="input-style"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dirección"
              className="input-style col-span-full"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Método de Pago"
              className="input-style"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            />
            <input
              type="number"
              placeholder="Total ($)"
              className="input-style"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Detalles del Pedido"
            className="input-style w-full h-24 resize-none"
            value={detallesPedido}
            onChange={(e) => setDetallesPedido(e.target.value)}
          />

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
              Guardar Pedido
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

AddOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

export default AddOrderModal;
