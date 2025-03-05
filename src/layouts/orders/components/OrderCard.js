import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function OrderCard({ order }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{order.nombre_cliente}</Typography>
        <Typography color="textSecondary">{order.estado_pedido}</Typography>
        <Typography variant="body2">{order.direccion_domicilio}</Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(order.fecha_hora).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ✅ Agregamos validación de PropTypes
OrderCard.propTypes = {
  order: PropTypes.shape({
    nombre_cliente: PropTypes.string.isRequired,
    estado_pedido: PropTypes.string.isRequired,
    direccion_domicilio: PropTypes.string.isRequired,
    fecha_hora: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
