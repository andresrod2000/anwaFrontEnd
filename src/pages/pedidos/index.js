import { useEffect, useState, useContext } from "react";
import axios from "axios";

// @mui material components
import {
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  Skeleton,
  Alert,
  Snackbar,
  Fab,
  useTheme,
  useMediaQuery,
  Fade,
  Container
} from "@mui/material";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  ShoppingCart as ShoppingCartIcon
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom components
import OrderCard from "layouts/orders/components/OrderCard";
import AddOrderModal from "layouts/orders/components/AddOrderModal";

// Context
import AuthContext from "../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Orders() {
  const { token } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Estados
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/api/pedidos/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setOrders(response.data);
      
      if (response.data.length === 0) {
        setError("No hay pedidos disponibles");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error al cargar los pedidos. Por favor, intenta nuevamente.");
      showSnackbar("Error al cargar los pedidos", "error");
    } finally {
      setLoading(false);
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

      showSnackbar("Estado del pedido actualizado correctamente", "success");
      fetchOrders();
    } catch (error) {
      console.error("Error actualizando el estado del pedido:", error);
      showSnackbar("Error al actualizar el estado del pedido", "error");
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddOrder = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOrderAdded = () => {
    fetchOrders();
    showSnackbar("Pedido agregado exitosamente", "success");
  };

  // Componente para mostrar el estado de carga
  const LoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" height={100} sx={{ mt: 2, borderRadius: 1 }} />
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  // Componente para mostrar cuando no hay pedidos
  const EmptyState = () => (
    <Fade in>
      <Paper
        elevation={0}
        sx={{
          textAlign: 'center',
          py: 8,
          px: 4,
          backgroundColor: 'background.paper',
          borderRadius: 3,
          border: '2px dashed',
          borderColor: 'divider'
        }}
      >
        <ShoppingCartIcon 
          sx={{ 
            fontSize: 80, 
            color: 'text.secondary',
            mb: 2,
            opacity: 0.5
          }} 
        />
        <Typography variant="h5" gutterBottom color="text.secondary">
          No hay pedidos disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Comienza agregando tu primer pedido
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleAddOrder}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Agregar Primer Pedido
        </Button>
      </Paper>
    </Fade>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: 2,
              mb: 3
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 1
                }}
              >
                Pedidos en Proceso
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gestiona y monitorea todos tus pedidos activos
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchOrders}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  minWidth: 120
                }}
              >
                Actualizar
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddOrder}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  minWidth: 140,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                Agregar Pedido
              </Button>
            </Box>
          </Box>

          {/* Stats or additional info could go here */}
          {!loading && orders.length > 0 && (
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                📊 Total de pedidos activos: {orders.length}
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Content Section */}
        <SoftBox>
          {loading ? (
            <LoadingSkeleton />
          ) : error && orders.length === 0 ? (
            <EmptyState />
          ) : (
            <Fade in>
              <Grid container spacing={3}>
                {orders.map((order, index) => (
                  <Grid item xs={12} md={6} lg={4} key={order.id || index}>
                    <Fade in timeout={300 + index * 100}>
                      <Box>
                        <OrderCard 
                          order={order} 
                          updateOrderStatus={updateOrderStatus}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}
        </SoftBox>
      </Container>

      {/* Floating Action Button for mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add order"
          onClick={handleAddOrder}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <Footer />

      {/* Modal */}
      <AddOrderModal
        open={openModal}
        handleClose={handleCloseModal}
        fetchOrders={handleOrderAdded}
      />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Orders;