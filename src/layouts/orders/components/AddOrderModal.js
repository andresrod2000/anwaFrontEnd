import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// @mui components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  IconButton,
  Slide,
  Alert,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Divider,
  Paper,
  Chip
} from "@mui/material";
import {
  Close as CloseIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  AttachMoney as MoneyIcon,
  Save as SaveIcon
} from "@mui/icons-material";

// Context
import AuthContext from "../../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Transition component for smooth modal animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Payment methods options
const PAYMENT_METHODS = [
  { value: "efectivo", label: "Efectivo", icon: "💵" },
  { value: "transferencia", label: "Transferencia", icon: "🏦" },
  { value: "tarjeta", label: "Tarjeta", icon: "💳" },
  { value: "nequi", label: "Nequi", icon: "📱" },
  { value: "daviplata", label: "Daviplata", icon: "📲" }
];

function AddOrderModal({ open, handleClose, fetchOrders }) {
  const { token } = useContext(AuthContext);

  // Form states
  const [formData, setFormData] = useState({
    nombreCliente: "",
    telefono: "",
    direccion: "",
    metodoPago: "",
    detallesPedido: "",
    total: ""
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Handle input changes
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombreCliente.trim()) {
      errors.nombreCliente = "El nombre del cliente es requerido";
    }
    
    if (!formData.telefono.trim()) {
      errors.telefono = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ""))) {
      errors.telefono = "El teléfono debe tener 10 dígitos";
    }
    
    if (!formData.direccion.trim()) {
      errors.direccion = "La dirección es requerida";
    }
    
    if (!formData.metodoPago) {
      errors.metodoPago = "Selecciona un método de pago";
    }
    
    if (!formData.detallesPedido.trim()) {
      errors.detallesPedido = "Los detalles del pedido son requeridos";
    }
    
    if (!formData.total || parseFloat(formData.total) <= 0) {
      errors.total = "El total debe ser mayor a 0";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Por favor, completa todos los campos correctamente");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newOrder = {
        nombre_cliente: formData.nombreCliente.trim(),
        telefono: formData.telefono.trim(),
        direccion_domicilio: formData.direccion.trim(),
        metodo_pago: formData.metodoPago,
        estado_pedido: "recibido",
        detalles_pedido: formData.detallesPedido.trim(),
        total: parseFloat(formData.total),
        comentarios: "",
      };

      await axios.post(`${API_BASE_URL}/api/pedidos/`, newOrder, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form and close modal
      resetForm();
      handleClose();
      fetchOrders();
      
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al crear el pedido. Por favor, intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombreCliente: "",
      telefono: "",
      direccion: "",
      metodoPago: "",
      detallesPedido: "",
      total: ""
    });
    setFieldErrors({});
    setError("");
  };

  const handleCloseModal = () => {
    if (!loading) {
      resetForm();
      handleClose();
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    }
    return value;
  };

  const handlePhoneChange = (event) => {
    const formatted = formatPhoneNumber(event.target.value);
    setFormData(prev => ({
      ...prev,
      telefono: formatted
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          color: 'white',
          p: 3,
          position: 'relative'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RestaurantIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Nuevo Pedido
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Completa la información para registrar el pedido
            </Typography>
          </Box>
        </Box>
        
        <IconButton
          onClick={handleCloseModal}
          disabled={loading}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Customer Information Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon color="primary" />
                <Typography variant="h6" color="primary">
                  Información del Cliente
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Cliente"
                    value={formData.nombreCliente}
                    onChange={handleInputChange('nombreCliente')}
                    error={!!fieldErrors.nombreCliente}
                    helperText={fieldErrors.nombreCliente}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                    error={!!fieldErrors.telefono}
                    helperText={fieldErrors.telefono || "Formato: 123 456 7890"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dirección de Domicilio"
                    value={formData.direccion}
                    onChange={handleInputChange('direccion')}
                    error={!!fieldErrors.direccion}
                    helperText={fieldErrors.direccion}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Order Details Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <RestaurantIcon color="primary" />
                <Typography variant="h6" color="primary">
                  Detalles del Pedido
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Detalles del Pedido"
                    value={formData.detallesPedido}
                    onChange={handleInputChange('detallesPedido')}
                    error={!!fieldErrors.detallesPedido}
                    helperText={fieldErrors.detallesPedido || "Describe los productos y cantidades"}
                    multiline
                    rows={3}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Método de Pago"
                    value={formData.metodoPago}
                    onChange={handleInputChange('metodoPago')}
                    error={!!fieldErrors.metodoPago}
                    helperText={fieldErrors.metodoPago}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaymentIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    disabled={loading}
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{method.icon}</span>
                          {method.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Total"
                    type="number"
                    value={formData.total}
                    onChange={handleInputChange('total')}
                    error={!!fieldErrors.total}
                    helperText={fieldErrors.total}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    disabled={loading}
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={handleCloseModal}
          disabled={loading}
          variant="outlined"
          size="large"
          sx={{ minWidth: 120 }}
        >
          Cancelar
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          sx={{
            minWidth: 140,
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e55a2b 0%, #e0851a 100%)',
            }
          }}
        >
          {loading ? 'Guardando...' : 'Guardar Pedido'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

export default AddOrderModal;