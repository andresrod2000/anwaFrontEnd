import { useState } from "react";
import PropTypes from "prop-types";

function OrderCard({ order, updateOrderStatus }) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(order.estado_pedido);

  const handleChangeStatus = () => {
    updateOrderStatus(order.id, newStatus);
    setOpen(false);
  };

  const estadoEstilos = {
    recibido: { color: "bg-yellow-100 text-yellow-800", icon: "⏰" },
    en_preparacion: { color: "bg-orange-100 text-orange-800", icon: "👨‍🍳" },
    en_camino: { color: "bg-blue-100 text-blue-800", icon: "🚚" },
    entregado: { color: "bg-green-100 text-green-800", icon: "✅" },
    cancelado: { color: "bg-red-100 text-red-800", icon: "❌" },
  };

  const estado = estadoEstilos[order.estado_pedido] || {};

  return (
    <>
      {/* Tarjeta estilo burbuja */}
      <div
        onClick={() => setOpen(true)}
        className="relative bg-white border border-orange-100 hover:border-orange-300 rounded-[2rem] shadow-md hover:shadow-xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.015]"
      >
        {/* Círculo decorativo */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-orange-500 rounded-full shadow-md animate-pulse"></div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-800">{order.nombre_cliente}</h3>

          <div
            className={`inline-flex items-center text-sm px-3 py-1 rounded-full font-medium w-fit ${estado.color}`}
          >
            <span className="mr-1">{estado.icon}</span>
            {order.estado_pedido.replace("_", " ")}
          </div>

          <p className="text-sm text-gray-600">
            📍 {order.direccion_domicilio}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(order.fecha_hora).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Modal para actualizar estado */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Cambiar Estado</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="recibido">Recibido</option>
              <option value="en_preparacion">En preparación</option>
              <option value="en_camino">En camino</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangeStatus}
                className="px-5 py-2 text-sm rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.25s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre_cliente: PropTypes.string.isRequired,
    estado_pedido: PropTypes.string.isRequired,
    direccion_domicilio: PropTypes.string.isRequired,
    fecha_hora: PropTypes.string.isRequired,
  }).isRequired,
  updateOrderStatus: PropTypes.func.isRequired,
};

export default OrderCard;
