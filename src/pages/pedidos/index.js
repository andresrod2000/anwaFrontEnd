import { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom components
import OrderCard from "layouts/orders/components/OrderCard";
import AddOrderModal from "layouts/orders/components/AddOrderModal";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext"; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//const API_BASE_URL = "http://127.0.0.1:8000"
function Orders() {
const { token } = useContext(AuthContext); // Obtener el token desde el contexto
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    

    try {
        const response = await axios.get(`${API_BASE_URL}/api/pedidos/`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        setOrders(response.data);
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};

const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/pedidos/${orderId}/`, 
        { estado_pedido: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      fetchOrders(); // Recargar la lista de pedidos después de actualizar el estado
    } catch (error) {
      console.error("Error actualizando el estado del pedido:", error);
    }
  };
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <h2>Pedidos en proceso</h2>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
            Agregar Pedido
          </Button>
        </SoftBox>
        <Grid container spacing={3}>
  {orders.map((order, index) => (
    <Grid item xs={12} md={6} lg={4} key={index}>
      <OrderCard order={order} updateOrderStatus={updateOrderStatus} />
    </Grid>
  ))}
</Grid>

      </SoftBox>
      <Footer />
      <AddOrderModal open={openModal} handleClose={() => setOpenModal(false)} fetchOrders={fetchOrders} />
    </DashboardLayout>
  );
}

export default Orders;