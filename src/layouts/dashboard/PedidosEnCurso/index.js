import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const pedidos = [
  { id: "#1001", cliente: "Juan Pérez", estado: "En preparación" },
  { id: "#1002", cliente: "María Gómez", estado: "En camino" },
  { id: "#1003", cliente: "Carlos López", estado: "Listo para entrega" },
];

const getColorEstado = (estado) => {
    switch (estado) {
      case "En preparación":
        return "#E65100"; // Naranja oscuro
      case "En camino":
        return "#0D47A1"; // Azul oscuro
      case "Listo para entrega":
        return "#1B5E20"; // Verde oscuro
      case "Cancelado":
        return "#B71C1C"; // Rojo oscuro
      default:
        return "#FFFFFF"; // Blanco
    }
  };
  

function PedidosEnCurso() {
  return (
    <Card sx={{ height: "100%", p: 2, backgroundColor: "#FF5733", color: "white" }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="bold" color="white">
          Pedidos en Curso
        </SoftTypography>
      </SoftBox>
      <List>
        {pedidos.map((pedido, index) => (
          <>
            <ListItem key={pedido.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#ff9800" }}>
                  <Icon sx={{ color: "white" }}>shopping_cart</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${pedido.id} - ${pedido.cliente}`}
                secondary={
                    <span style={{
                      backgroundColor: "rgba(0, 0, 0, 0.3)", // Fondo oscuro semitransparente
                      padding: "2px 5px",
                      borderRadius: "4px",
                      color: getColorEstado(pedido.estado),
                      fontWeight: "bold",
                    }}>
                      {pedido.estado}
                    </span>
                  }
                sx={{ color: "white !important" }}
                secondaryTypographyProps={{ style: { color: getColorEstado(pedido.estado), fontWeight: "bold" } }}
              />
            </ListItem>
            {index < pedidos.length - 1 && <Divider sx={{ backgroundColor: "#444" }} />}
          </>
        ))}
      </List>
    </Card>
  );
}

export default PedidosEnCurso;
