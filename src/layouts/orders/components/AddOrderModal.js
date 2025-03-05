import { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddOrderModal({ open, handleClose, fetchOrders }) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  
  const handleSubmit = () => {
    console.log("Nuevo pedido:", { nombre, direccion });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Agregar Pedido</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre del Cliente"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Dirección"
          fullWidth
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}

// ✅ Agregamos validación de PropTypes
AddOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

export default AddOrderModal;
