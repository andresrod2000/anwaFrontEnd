import { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AuthContext from "../../../context/AuthContext"; 

const API_BASE_URL = "http://127.0.0.1:8000"; // Ajusta si es necesario

function AddOrderModal({ open, handleClose, fetchOrders }) {
  const { token } = useContext(AuthContext); // Obtener el token desde el contexto

  // Estado para los campos del formulario
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
        estado_pedido: "recibido", // Estado inicial del pedido
        detalles_pedido: detallesPedido,
        total,
        comentarios: "", // Opcional
      };

      await axios.post(`${API_BASE_URL}/api/pedidos/`, newOrder, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar la lista de pedidos después de agregar uno nuevo
      fetchOrders();
      handleClose();
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Agregar Pedido</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre del Cliente"
          fullWidth
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Teléfono"
          fullWidth
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Dirección"
          fullWidth
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Método de Pago"
          fullWidth
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Detalles del Pedido"
          fullWidth
          multiline
          value={detallesPedido}
          onChange={(e) => setDetallesPedido(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Total"
          fullWidth
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Agregar Pedido
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Validación de props con PropTypes
AddOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

export default AddOrderModal;
