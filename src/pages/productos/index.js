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
import ProductCard from "layouts/products/components/ProductCard"; // Asegúrate de tener este componente
import AddProductModal from "layouts/products/components/AddProductModal"; // Asegúrate de tener este componente

import { useContext } from "react";
import AuthContext from "../../context/AuthContext"; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Productos() {
  const { token } = useContext(AuthContext); // Obtener el token desde el contexto
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/productosmod/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const updateProductStatus = async (productId, newStatus) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/productosmod/${productId}/`, 
        { disponible: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProductos(); // Recargar la lista de productos después de actualizar el estado
    } catch (error) {
      console.error("Error actualizando el estado del producto:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <h2>Productos Disponibles</h2>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
            Agregar Producto
          </Button>
        </SoftBox>
        <Grid container spacing={3}>
          {productos.map((producto, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <ProductCard producto={producto} updateProductStatus={updateProductStatus} />
            </Grid>
          ))}
        </Grid>
      </SoftBox>
      <Footer />
      <AddProductModal open={openModal} handleClose={() => setOpenModal(false)} fetchProductos={fetchProductos} />
    </DashboardLayout>
  );
}

export default Productos;
