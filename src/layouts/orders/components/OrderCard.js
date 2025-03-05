import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function OrderCard({ order, updateOrderStatus }) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(order.estado_pedido);

  const handleChangeStatus = () => {
    updateOrderStatus(order.id, newStatus);
    setOpen(false);
  };

  return (
    <>
      <Card onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        <CardContent>
          <Typography variant="h6">{order.nombre_cliente}</Typography>
          <Typography color="textSecondary">{order.estado_pedido}</Typography>
          <Typography variant="body2">{order.direccion_domicilio}</Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(order.fecha_hora).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal para cambiar estado */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cambiar Estado del Pedido</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value="recibido">Recibido</MenuItem>
            <MenuItem value="en_preparacion">En preparación</MenuItem>
            <MenuItem value="en_camino">En camino</MenuItem>
            <MenuItem value="entregado">Entregado</MenuItem>
            <MenuItem value="cancelado">Cancelado</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleChangeStatus} color="primary">Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Validación de PropTypes
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
