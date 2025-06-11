import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// @mui material components
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Alert,
  Skeleton,
  Pagination,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Fab,
  Zoom,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  CardMedia,
  CardActions,
  Divider,
  Stack
} from "@mui/material";
import {
  Add as AddIcon,
  Search,
  FilterList,
  ViewModule,
  ViewList,
  Refresh,
  Download,
  Restaurant,
  Inventory,
  TrendingUp,
  AttachMoney,
  CheckCircle,
  Cancel,
  Sort,
  Edit,
  Close,
  PhotoCamera,
  Save,
  LocalOffer,
  MoreVert,
  Visibility
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import AuthContext from "../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ======= COMPONENTE PRODUCTCARD MEJORADO =======
const ProductCard = ({ producto, updateProductStatus }) => {
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState(producto.disponible ? "disponible" : "no_disponible");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const handleChangeStatus = async () => {
    await updateProductStatus(producto.id, newStatus === "disponible");
    setOpenStatusDialog(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          },
          transition: 'all 0.3s ease',
          borderRadius: 3,
          overflow: "visible"
        }}
      >
        {/* Badge de estado */}
        <Chip
          label={producto.disponible ? "Disponible" : "No Disponible"}
          color={producto.disponible ? "success" : "error"}
          icon={producto.disponible ? <CheckCircle /> : <Cancel />}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1,
            fontWeight: "bold"
          }}
        />

        {/* Imagen del producto o placeholder */}
        <CardMedia
          sx={{
            height: 140,
            bgcolor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {producto.imagen ? (
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Restaurant sx={{ fontSize: 48, color: 'white', opacity: 0.7 }} />
          )}
        </CardMedia>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
            {producto.nombre}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {producto.descripcion || "Sin descripción disponible"}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h5" fontWeight="bold" color="success.main">
              {formatPrice(producto.precio)}
            </Typography>
            <Chip 
              label={producto.categoria || "Sin categoría"}
              variant="outlined"
              size="small"
              color="primary"
            />
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Stack direction="row" spacing={1} width="100%">
            <Button
              size="small"
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() => setOpenDetailDialog(true)}
              sx={{ flex: 1 }}
            >
              Ver Detalle
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setOpenStatusDialog(true)}
              sx={{ flex: 1 }}
            >
              Editar Estado
            </Button>
          </Stack>
        </CardActions>
      </Card>

      {/* Dialog para cambiar estado */}
      <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Edit color="primary" />
            Cambiar Disponibilidad
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Producto: <strong>{producto.nombre}</strong>
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              value={newStatus}
              label="Estado"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="disponible">
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircle color="success" fontSize="small" />
                  Disponible
                </Box>
              </MenuItem>
              <MenuItem value="no_disponible">
                <Box display="flex" alignItems="center" gap={1}>
                  <Cancel color="error" fontSize="small" />
                  No Disponible
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleChangeStatus}
            startIcon={<Save />}
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para ver detalles */}
      <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Detalles del Producto</Typography>
            <IconButton onClick={() => setOpenDetailDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box textAlign="center" mb={2}>
                {producto.imagen ? (
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    style={{ width: '100%', maxWidth: 200, height: 150, objectFit: 'cover', borderRadius: 8 }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      width: 200, 
                      height: 150, 
                      bgcolor: 'grey.200', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: 2,
                      mx: 'auto'
                    }}
                  >
                    <Restaurant sx={{ fontSize: 48, color: 'grey.500' }} />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {producto.nombre}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                {producto.descripcion || "Sin descripción disponible"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Precio:
              </Typography>
              <Typography variant="h6" color="success.main" fontWeight="bold">
                {formatPrice(producto.precio)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Categoría:
              </Typography>
              <Typography variant="body1">
                {producto.categoria || "Sin categoría"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Estado:
              </Typography>
              <Chip
                label={producto.disponible ? "Disponible" : "No Disponible"}
                color={producto.disponible ? "success" : "error"}
                icon={producto.disponible ? <CheckCircle /> : <Cancel />}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    precio: PropTypes.number.isRequired,
    categoria: PropTypes.string,
    disponible: PropTypes.bool.isRequired,
    imagen: PropTypes.string,
  }).isRequired,
  updateProductStatus: PropTypes.func.isRequired,
};

// ======= COMPONENTE ADDPRODUCTMODAL MEJORADO =======
const AddProductModal = ({ open, handleClose, fetchProductos }) => {
  const { token } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    disponible: true,
    imagen: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const categoriasPredefinidas = [
    "Hamburguesas",
    "Perros Calientes", 
    "Bebidas",
    "Postres",
    "Entradas",
    "Ensaladas",
    "Acompañamientos",
    "Especialidades"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagen: file }));
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Validaciones
    if (!formData.nombre.trim()) {
      setError("El nombre del producto es requerido");
      setLoading(false);
      return;
    }
    if (!formData.precio || formData.precio <= 0) {
      setError("El precio debe ser mayor a 0");
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    submitData.append("nombre", formData.nombre);
    submitData.append("descripcion", formData.descripcion);
    submitData.append("precio", formData.precio);
    submitData.append("categoria", formData.categoria);
    submitData.append("disponible", formData.disponible);
    
    if (formData.imagen) {
      submitData.append("imagen", formData.imagen);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/productosmod/`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Resetear formulario
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        disponible: true,
        imagen: null
      });
      setPreviewImage(null);
      
      await fetchProductos();
      handleClose();
    } catch (error) {
      console.error("Error creando producto:", error);
      setError("Error al crear el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      disponible: true,
      imagen: null
    });
    setPreviewImage(null);
    setError("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Restaurant color="primary" />
            <Typography variant="h6">Agregar Nuevo Producto</Typography>
          </Box>
          <IconButton onClick={handleCloseModal}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} mt={0}>
          {/* Imagen del producto */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Imagen del Producto
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  border: "2px dashed",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                  '&:hover': {
                    borderColor: "primary.main",
                    bgcolor: "grey.50"
                  }
                }}
                onClick={() => document.getElementById('image-upload').click()}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8
                    }}
                  />
                ) : (
                  <Box textAlign="center">
                    <PhotoCamera sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Clic para subir imagen
                    </Typography>
                  </Box>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Box>
            </Box>
          </Grid>

          {/* Formulario */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Producto *"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  error={!formData.nombre.trim() && error}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  multiline
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Describe el producto..."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio *"
                  type="number"
                  value={formData.precio}
                  onChange={(e) => handleInputChange("precio", e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  error={(!formData.precio || formData.precio <= 0) && error}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={formData.categoria}
                    label="Categoría"
                    onChange={(e) => handleInputChange("categoria", e.target.value)}
                  >
                    <MenuItem value="">
                      <em>Seleccionar categoría</em>
                    </MenuItem>
                    {categoriasPredefinidas.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.disponible}
                      onChange={(e) => handleInputChange("disponible", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Producto disponible para la venta"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={handleCloseModal}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? null : <Save />}
        >
          {loading ? "Guardando..." : "Crear Producto"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchProductos: PropTypes.func.isRequired,
};

// ======= COMPONENTES DE MÉTRICAS Y UTILIDADES =======

// Componente para métricas de productos
const ProductMetricCard = ({ title, value, icon, color = "primary", subtitle = "", trend = null }) => {
  return (
    <Card sx={{ height: "100%", position: "relative", overflow: "visible" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" mt={0.5}>
                {subtitle}
              </Typography>
            )}
            {trend !== null && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2" color="success.main" ml={0.5}>
                  +{trend}% vs ayer
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: `${color}.main`, 
              width: 56, 
              height: 56,
              position: "absolute",
              top: -20,
              right: 20,
              boxShadow: 3
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

ProductMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  subtitle: PropTypes.string,
  trend: PropTypes.number
};

// Componente para skeleton loading
const ProductSkeleton = () => (
  <Card sx={{ height: 280 }}>
    <CardContent>
      <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
      <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} width="60%" sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={32} width={100} />
    </CardContent>
  </Card>
);

// Componente para vista en lista alternativa
const ProductListItem = ({ producto, updateProductStatus }) => {
  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 4 } }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                {producto.nombre?.charAt(0) || "P"}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {producto.categoria || "Sin categoría"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary" paragraph sx={{ mb: 0 }}>
              {producto.descripcion || "Sin descripción"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" fontWeight="bold" color="success.main">
              ${producto.precio?.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Chip
              label={producto.disponible ? "Disponible" : "No Disponible"}
              color={producto.disponible ? "success" : "error"}
              icon={producto.disponible ? <CheckCircle /> : <Cancel />}
              size="small"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ProductListItem.propTypes = {
  producto: PropTypes.object.isRequired,
  updateProductStatus: PropTypes.func.isRequired
};

function Productos() {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para filtros y vista
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("");
  const [ordenamiento, setOrdenamiento] = useState("nombre");
  const [tipoVista, setTipoVista] = useState("grid");
  const [page, setPage] = useState(1);
  
  const productosPorPagina = 9;

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/productosmod/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching productos:", error);
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
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

      fetchProductos();
    } catch (error) {
      console.error("Error actualizando el estado del producto:", error);
    }
  };

  const handleRefresh = () => {
    fetchProductos();
  };

  const handleExport = () => {
    alert("Exportando lista de productos...");
  };

  // Filtrar y ordenar productos
  const productosFiltrados = productos.filter(producto => {
    const matchBusqueda = producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
                         producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = filtroCategoria === "" || producto.categoria === filtroCategoria;
    const matchDisponibilidad = filtroDisponibilidad === "" || 
                               (filtroDisponibilidad === "disponible" && producto.disponible) ||
                               (filtroDisponibilidad === "no_disponible" && !producto.disponible);
    
    return matchBusqueda && matchCategoria && matchDisponibilidad;
  }).sort((a, b) => {
    switch (ordenamiento) {
      case "nombre":
        return (a.nombre || "").localeCompare(b.nombre || "");
      case "precio":
        return (a.precio || 0) - (b.precio || 0);
      case "categoria":
        return (a.categoria || "").localeCompare(b.categoria || "");
      default:
        return 0;
    }
  });

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosPaginados = productosFiltrados.slice(
    (page - 1) * productosPorPagina,
    page * productosPorPagina
  );

  // Métricas calculadas
  const totalProductos = productos.length;
  const productosDisponibles = productos.filter(p => p.disponible).length;
  const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))];
  const precioPromedio = productos.length > 0 
    ? productos.reduce((sum, p) => sum + (Number.isFinite(Number(p.precio)) ? Number(p.precio) : 0), 0) / productos.length 
    : 0;


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        {/* Header mejorado */}
        <SoftBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Gestión de Productos
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Administra el menú y productos de tu restaurante
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Tooltip title="Actualizar">
              <IconButton onClick={handleRefresh} disabled={loading}>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
              sx={{ borderRadius: 2 }}
            >
              Agregar Producto
            </Button>
          </Box>
        </SoftBox>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Métricas principales */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <ProductMetricCard
              title="Total Productos"
              value={totalProductos}
              subtitle={`${productosDisponibles} disponibles`}
              icon={<Restaurant />}
              color="primary"
              trend={5.2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductMetricCard
              title="Disponibles"
              value={productosDisponibles}
              subtitle={`${totalProductos - productosDisponibles} no disponibles`}
              icon={<CheckCircle />}
              color="success"
              trend={8.1}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductMetricCard
              title="Categorías"
              value={categorias.length}
              subtitle="Diferentes tipos"
              icon={<Inventory />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductMetricCard
              title="Precio Promedio"
              value={`$${precioPromedio.toFixed(0)}`}
              subtitle="Por producto"
              icon={<AttachMoney />}
              color="warning"
            />
          </Grid>
        </Grid>

        {/* Filtros y controles */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={filtroCategoria}
                    label="Categoría"
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {categorias.map((categoria) => (
                      <MenuItem key={categoria} value={categoria}>
                        {categoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Disponibilidad</InputLabel>
                  <Select
                    value={filtroDisponibilidad}
                    label="Disponibilidad"
                    onChange={(e) => setFiltroDisponibilidad(e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="disponible">Disponibles</MenuItem>
                    <MenuItem value="no_disponible">No Disponibles</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Ordenar por</InputLabel>
                  <Select
                    value={ordenamiento}
                    label="Ordenar por"
                    onChange={(e) => setOrdenamiento(e.target.value)}
                    startAdornment={<Sort />}
                  >
                    <MenuItem value="nombre">Nombre</MenuItem>
                    <MenuItem value="precio">Precio</MenuItem>
                    <MenuItem value="categoria">Categoría</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ToggleButtonGroup
                  value={tipoVista}
                  exclusive
                  onChange={(e, newView) => newView && setTipoVista(newView)}
                  size="small"
                >
                  <ToggleButton value="grid">
                    <ViewModule />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ViewList />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} md={1}>
                <Chip 
                  icon={<FilterList />} 
                  label={`${productosFiltrados.length}`} 
                  variant="outlined" 
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Lista/Grid de productos */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ProductSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {tipoVista === "grid" ? (
              <Grid container spacing={3}>
                {productosPaginados.map((producto, index) => (
                  <Grid item xs={12} md={6} lg={4} key={producto.id || index}>
                    <ProductCard 
                      producto={producto} 
                      updateProductStatus={updateProductStatus} 
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box>
                {productosPaginados.map((producto, index) => (
                  <ProductListItem
                    key={producto.id || index}
                    producto={producto}
                    updateProductStatus={updateProductStatus}
                  />
                ))}
              </Box>
            )}

            {/* Mensaje cuando no hay productos */}
            {productosFiltrados.length === 0 && !loading && (
              <Card sx={{ textAlign: "center", py: 6 }}>
                <CardContent>
                  <Restaurant sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h6" color="textSecondary">
                    No se encontraron productos
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Intenta cambiar los filtros o agregar nuevos productos
                  </Typography>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPaginas}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* FAB para agregar producto (alternativo en móvil) */}
        <Zoom in={true}>
          <Fab
            color="primary"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              display: { xs: "flex", md: "none" }
            }}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </SoftBox>
      
      <Footer />
      
      {/* Modal mejorado integrado */}
      <AddProductModal 
        open={openModal} 
        handleClose={() => {
          setOpenModal(false);
        }} 
        fetchProductos={fetchProductos} 
      />
    </DashboardLayout>
  );
}

export default Productos;