import { useState, useEffect } from "react";
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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PedidosEnCurso = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/pedidos-en-proceso/`) // Reemplaza con tu API real
      .then((response) => response.json())
      .then((data) => {
        const pedidosTransformados = data.map((pedido, index) => ({
          id: `#${1001 + index}`,
          cliente: pedido.nombre_cliente,
          estado: formatearEstado(pedido.estado_pedido),
        }));
        setPedidos(pedidosTransformados);
      })
      .catch((error) => console.error("Error obteniendo pedidos:", error));
  }, []);

  const formatearEstado = (estado) => {
    const estadosMap = {
      en_preparacion: "En preparación",
      en_camino: "En camino",
      listo_para_entrega: "Listo para entrega",
    };
    return estadosMap[estado] || "Desconocido";
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case "En preparación":
        return "#E65100";
      case "En camino":
        return "#0D47A1";
      case "Listo para entrega":
        return "#1B5E20";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <Card sx={{ height: "100%", p: 2, backgroundColor: "#FF5733", color: "white" }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="bold" color="white">
          Pedidos en Curso
        </SoftTypography>
      </SoftBox>
      <List>
        {pedidos.map((pedido, index) => (
          <ListItem key={pedido.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#ff9800" }}>
                <Icon sx={{ color: "white" }}>shopping_cart</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${pedido.id} - ${pedido.cliente}`}
              secondary={
                <span
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    color: getColorEstado(pedido.estado),
                    fontWeight: "bold",
                  }}
                >
                  {pedido.estado}
                </span>
              }
              sx={{ color: "white !important" }}
              secondaryTypographyProps={{
                style: { color: getColorEstado(pedido.estado), fontWeight: "bold" },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PedidosEnCurso;
