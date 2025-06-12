import React, { useState } from "react";
import PropTypes from "prop-types";

// @mui components
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Grid,
  Paper,
  Fade,
  Zoom,
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Phone as PhoneIcon
} from "@mui/icons-material";

function OrderCard({ order, updateOrderStatus }) {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(order.estado_pedido);
  const [loading, setLoading] = useState(false);

  // Estado y configuración de estilos
  const estadoConfig = {
    recibido: { 
      color: "warning", 
      icon: "⏰", 
      bgColor: "#fff3cd",
      textColor: "#856404",
      label: "Recibido"
    },
    en_preparacion: { 
      color: "info", 
      icon: "👨‍🍳", 
      bgColor: "#d1ecf1",
      textColor: "#0c5460",
      label: "En Preparación"
    },
    en_camino: { 
      color: "primary", 
      icon: "🚚", 
      bgColor: "#d4edda",
      textColor: "#155724",
      label: "En Camino"
    },
    entregado: { 
      color: "success", 
      icon: "✅", 
      bgColor: "#d4edda",
      textColor: "#155724",
      label: "Entregado"
    },
    cancelado: { 
      color: "error", 
      icon: "❌", 
      bgColor: "#f8d7da",
      textColor: "#721c24",
      label: "Cancelado"
    },
  };

  const currentStatus = estadoConfig[order.estado_pedido] || estadoConfig.recibido;

  const handleChangeStatus = async () => {
    if (newStatus === order.estado_pedido) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      await updateOrderStatus(order.id, newStatus);
      setOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusOptions = () => {
    const allStatuses = ['recibido', 'en_preparacion', 'en_camino', 'entregado', 'cancelado'];
    return allStatuses.map(status => ({
      value: status,
      label: estadoConfig[status].label,
      icon: estadoConfig[status].icon,
      disabled: status === 'entregado' && order.estado_pedido === 'cancelado'
    }));
  };

  return (
    <>
      {/* Card Principal */}
      <Zoom in timeout={300}>
        <Card
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '2px solid transparent',
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              borderColor: 'primary.main',
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: `linear-gradient(90deg, ${currentStatus.bgColor}, ${currentStatus.textColor})`,
            }
          }}
          onClick={() => setDetailsOpen(true)}
        >
          <CardContent sx={{ p: 3, pt: 4 }}>
            {/* Header con nombre y estado */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {order.nombre_cliente}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Pedido #{order.id}
                </Typography>
              </Box>
              
              <Chip
                icon={<span style={{ fontSize: '16px' }}>{currentStatus.icon}</span>}
                label={currentStatus.label}
                color={currentStatus.color}
                variant="filled"
                size="small"
                sx={{ fontWeight: 'medium' }}
              />
            </Box>

            {/* Información básica */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {order.direccion_domicilio}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(order.fecha_hora)}
                </Typography>
              </Box>

              {order.total && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MoneyIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                    {formatCurrency(order.total)}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailsOpen(true);
                }}
                sx={{ 
                  flex: 1, 
                  textTransform: 'none', 
                  color: 'primary.main', 
                  borderColor: 'primary.main', 
                  '&:hover': {
                    borderColor: 'primary.dark',
                    color: 'primary.dark'
                  } 
                }}
                
              >
                Ver Detalles
              </Button>
              
              <Button
                size="small"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                sx={{ 
                  flex: 1,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e55a2b 0%, #e0851a 100%)',
                  }
                }}
              >
                Cambiar Estado
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Zoom>

      {/* Modal de Detalles */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <RestaurantIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Detalles del Pedido</Typography>
                <Typography variant="body2" color="text.secondary">
                  Pedido #{order.id}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setDetailsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <List sx={{ py: 0 }}>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Cliente" 
                secondary={order.nombre_cliente}
              />
            </ListItem>

            {order.telefono && (
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Teléfono" 
                  secondary={order.telefono}
                />
              </ListItem>
            )}

            <ListItem>
              <ListItemIcon>
                <LocationIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Dirección" 
                secondary={order.direccion_domicilio}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ScheduleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Fecha y Hora" 
                secondary={formatDate(order.fecha_hora)}
              />
            </ListItem>

            {order.metodo_pago && (
              <ListItem>
                <ListItemIcon>
                  <PaymentIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Método de Pago" 
                  secondary={order.metodo_pago.charAt(0).toUpperCase() + order.metodo_pago.slice(1)}
                />
              </ListItem>
            )}

            {order.total && (
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Total" 
                  secondary={
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(order.total)}
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>

          {order.detalles_pedido && (
            <>
              <Divider sx={{ my: 2 }} />
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Detalles del Pedido:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.detalles_pedido}
                </Typography>
              </Paper>
            </>
          )}

          {order.comentarios && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'info.light', borderRadius: 2, mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Comentarios:
              </Typography>
              <Typography variant="body2">
                {order.comentarios}
              </Typography>
            </Paper>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDetailsOpen(false)} variant="outlined">
            Cerrar
          </Button>
          <Button 
            onClick={() => {
              setDetailsOpen(false);
              setOpen(true);
            }}
            variant="contained"
            startIcon={<EditIcon />}
          >
            Cambiar Estado
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para cambiar estado */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Cambiar Estado</Typography>
            <IconButton onClick={() => setOpen(false)} disabled={loading}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Pedido de <strong>{order.nombre_cliente}</strong>
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Estado del Pedido</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Estado del Pedido"
              disabled={loading}
            >
              {getStatusOptions().map((option) => (
                <MenuItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{option.icon}</span>
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpen(false)} 
            disabled={loading}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleChangeStatus}
            disabled={loading || newStatus === order.estado_pedido}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #e55a2b 0%, #e0851a 100%)',
              }
            }}
          >
            {loading ? 'Actualizando...' : 'Actualizar Estado'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre_cliente: PropTypes.string.isRequired,
    estado_pedido: PropTypes.string.isRequired,
    direccion_domicilio: PropTypes.string.isRequired,
    fecha_hora: PropTypes.string.isRequired,
    telefono: PropTypes.string,
    metodo_pago: PropTypes.string,
    total: PropTypes.number,
    detalles_pedido: PropTypes.string,
    comentarios: PropTypes.string,
  }).isRequired,
  updateOrderStatus: PropTypes.func.isRequired,
};

export default OrderCard;