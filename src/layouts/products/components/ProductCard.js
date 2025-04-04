import { useState } from "react";
import PropTypes from "prop-types";

function ProductCard({ producto, updateProductStatus }) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(producto.disponible ? "disponible" : "no disponible");

  const handleChangeStatus = () => {
    updateProductStatus(producto.id, newStatus === "disponible");
    setOpen(false);
  };

  const estadoEstilos = {
    disponible: { color: "bg-green-100 text-green-800", icon: "✅" },
    no_disponible: { color: "bg-red-100 text-red-800", icon: "❌" },
  };

  const estado = estadoEstilos[newStatus] || {};

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
          <h3 className="text-xl font-bold text-gray-800">{producto.nombre}</h3>

          <div
            className={`inline-flex items-center text-sm px-3 py-1 rounded-full font-medium w-fit ${estado.color}`}
          >
            <span className="mr-1">{estado.icon}</span>
            {newStatus === "disponible" ? "Disponible" : "No Disponible"}
          </div>

          <p className="text-sm text-gray-600">
            {producto.descripcion}
          </p>

          <p className="text-sm text-gray-600">
            Precio: ${producto.precio}
          </p>

          <p className="text-xs text-gray-400">
            Categoría: {producto.categoria || "Sin categoría"}
          </p>
        </div>
      </div>

      {/* Modal para actualizar estado */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Cambiar Disponibilidad</h2>
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
              <option value="disponible">Disponible</option>
              <option value="no_disponible">No disponible</option>
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

ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    precio: PropTypes.number.isRequired,
    categoria: PropTypes.string,
    disponible: PropTypes.bool.isRequired,
  }).isRequired,
  updateProductStatus: PropTypes.func.isRequired,
};

export default ProductCard;
