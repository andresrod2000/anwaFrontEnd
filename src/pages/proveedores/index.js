import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Menu,
  MenuItem as MenuItemAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Rating,
  Pagination,
  InputAdornment,
  Tooltip,
  Badge
} from "@mui/material";
import {
  Business,
  Add,
  MoreVert,
  Search,
  FilterList,
  Download,
  Refresh,
  Phone,
  Email,
  LocationOn,
  Star,
  TrendingUp,
  ShoppingCart,
  Assessment,
  CheckCircle,
  Warning,
  Error,
  Edit,
  Visibility,
  Delete,
  LocalShipping,
  Inventory,
  AttachMoney
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Datos dummy para proveedores
const proveedoresData = [
  {
    id: 1,
    nombre: "TechSupply Corp",
    contacto: "Carlos Mendoza",
    telefono: "+1 (555) 123-4567",
    email: "carlos@techsupply.com",
    direccion: "Av. Tecnología 123, Ciudad Tech",
    categoria: "Electrónicos",
    rating: 4.8,
    estado: "Activo",
    ordenesActivas: 12,
    totalProductos: 145,
    valorTotal: 85000,
    fechaUltimaOrden: "2024-06-10",
    tiempoEntrega: 3,
    confiabilidad: 95
  },
  {
    id: 2,
    nombre: "Textiles Premium SA",
    contacto: "Ana Rodriguez",
    telefono: "+1 (555) 234-5678",
    email: "ana@textilespremium.com",
    direccion: "Calle Industria 456, Zona Textil",
    categoria: "Ropa",
    rating: 4.5,
    estado: "Activo",
    ordenesActivas: 8,
    totalProductos: 89,
    valorTotal: 45000,
    fechaUltimaOrden: "2024-06-08",
    tiempoEntrega: 5,
    confiabilidad: 88
  },
  {
    id: 3,
    nombre: "HomeGoods Solutions",
    contacto: "Miguel Torres",
    telefono: "+1 (555) 345-6789",
    email: "miguel@homegoods.com",
    direccion: "Boulevard Hogar 789, Centro",
    categoria: "Hogar",
    rating: 4.2,
    estado: "Activo",
    ordenesActivas: 15,
    totalProductos: 203,
    valorTotal: 62000,
    fechaUltimaOrden: "2024-06-12",
    tiempoEntrega: 4,
    confiabilidad: 92
  },
  {
    id: 4,
    nombre: "SportMax Distribution",
    contacto: "Laura Jiménez",
    telefono: "+1 (555) 456-7890",
    email: "laura@sportmax.com",
    direccion: "Av. Deportes 321, Zona Norte",
    categoria: "Deportes",
    rating: 3.9,
    estado: "Pendiente",
    ordenesActivas: 5,
    totalProductos: 67,
    valorTotal: 28000,
    fechaUltimaOrden: "2024-05-28",
    tiempoEntrega: 7,
    confiabilidad: 78
  },
  {
    id: 5,
    nombre: "LibroMundo Editorial",
    contacto: "Fernando Vega",
    telefono: "+1 (555) 567-8901",
    email: "fernando@libromundo.com",
    direccion: "Calle Cultura 654, Distrito Educativo",
    categoria: "Libros",
    rating: 4.6,
    estado: "Activo",
    ordenesActivas: 3,
    totalProductos: 312,
    valorTotal: 18000,
    fechaUltimaOrden: "2024-06-05",
    tiempoEntrega: 2,
    confiabilidad: 94
  },
  {
    id: 6,
    nombre: "Global Electronics Ltd",
    contacto: "Patricia Chen",
    telefono: "+1 (555) 678-9012",
    email: "patricia@globalelectronics.com",
    direccion: "Tech Park 987, Silicon Valley",
    categoria: "Electrónicos",
    rating: 4.7,
    estado: "Inactivo",
    ordenesActivas: 0,
    totalProductos: 156,
    valorTotal: 95000,
    fechaUltimaOrden: "2024-04-15",
    tiempoEntrega: 6,
    confiabilidad: 85
  }
];

// Datos para métricas
const ordenesRecientes = [
  { id: "ORD-001", proveedor: "TechSupply Corp", fecha: "2024-06-15", total: 12500, estado: "Entregado" },
  { id: "ORD-002", proveedor: "Textiles Premium SA", fecha: "2024-06-14", total: 8900, estado: "En tránsito" },
  { id: "ORD-003", proveedor: "HomeGoods Solutions", fecha: "2024-06-13", total: 15600, estado: "Pendiente" },
  { id: "ORD-004", proveedor: "LibroMundo Editorial", fecha: "2024-06-12", total: 3200, estado: "Entregado" },
  { id: "ORD-005", proveedor: "SportMax Distribution", fecha: "2024-06-10", total: 7800, estado: "Procesando" }
];

const topCategorias = [
  { categoria: "Electrónicos", proveedores: 2, valor: 180000, color: "#8884d8" },
  { categoria: "Hogar", proveedores: 1, valor: 62000, color: "#82ca9d" },
  { categoria: "Ropa", proveedores: 1, valor: 45000, color: "#ffc658" },
  { categoria: "Deportes", proveedores: 1, valor: 28000, color: "#ff7300" },
  { categoria: "Libros", proveedores: 1, valor: 18000, color: "#8dd1e1" }
];

// Componente para métricas de proveedores
const SupplierMetricCard = ({ title, value, icon, color = "primary", subtitle = "", trend = null }) => {
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
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2" color="success.main" ml={0.5}>
                  +{trend}% vs mes anterior
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

SupplierMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  subtitle: PropTypes.string,
  trend: PropTypes.number
};

// Componente para gráfico de categorías
const CategoryChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.valor));
  
  return (
    <Box sx={{ p: 2 }}>
      {data.map((item, index) => (
        <Box key={index} mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2" fontWeight="bold">
              {item.categoria}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${item.valor.toLocaleString()}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(item.valor / maxValue) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                backgroundColor: item.color,
                borderRadius: 4,
              },
            }}
          />
          <Typography variant="caption" color="textSecondary">
            {item.proveedores} proveedor(es)
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

CategoryChart.propTypes = {
  data: PropTypes.array.isRequired
};

// Componente para chip de estado
const EstadoChip = ({ estado }) => {
  const getEstadoConfig = () => {
    switch (estado) {
      case "Activo":
        return { color: "success", icon: <CheckCircle fontSize="small" /> };
      case "Pendiente":
        return { color: "warning", icon: <Warning fontSize="small" /> };
      case "Inactivo":
        return { color: "error", icon: <Error fontSize="small" /> };
      default:
        return { color: "default", icon: <CheckCircle fontSize="small" /> };
    }
  };

  const config = getEstadoConfig();
  
  return (
    <Chip 
      label={estado} 
      color={config.color} 
      icon={config.icon}
      size="small" 
      variant="outlined"
    />
  );
};

EstadoChip.propTypes = {
  estado: PropTypes.string.isRequired
};

// Componente para rating con tooltip
const RatingDisplay = ({ rating, size = "small" }) => {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Rating value={rating} precision={0.1} size={size} readOnly />
      <Typography variant="body2" color="textSecondary">
        {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string
};

function Proveedores() {
  const [proveedores] = useState(proveedoresData);
  const [loading, setLoading] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const proveedoresPorPagina = 5;

  // Filtrar proveedores
  const proveedoresFiltrados = proveedores.filter(proveedor => {
    const matchBusqueda = proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         proveedor.contacto.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = filtroCategoria === "" || proveedor.categoria === filtroCategoria;
    const matchEstado = filtroEstado === "" || proveedor.estado === filtroEstado;
    return matchBusqueda && matchCategoria && matchEstado;
  });

  // Paginación
  const totalPaginas = Math.ceil(proveedoresFiltrados.length / proveedoresPorPagina);
  const proveedoresPaginados = proveedoresFiltrados.slice(
    (page - 1) * proveedoresPorPagina,
    page * proveedoresPorPagina
  );

  // Métricas calculadas
  const totalProveedores = proveedores.length;
  const proveedoresActivos = proveedores.filter(p => p.estado === "Activo").length;
  const ordenesPendientes = proveedores.reduce((sum, p) => sum + p.ordenesActivas, 0);
  const valorTotal = proveedores.reduce((sum, p) => sum + p.valorTotal, 0);
  const ratingPromedio = proveedores.reduce((sum, p) => sum + p.rating, 0) / proveedores.length;

  const handleMenuClick = (event, proveedor) => {
    setAnchorEl(event.currentTarget);
    setSelectedSupplier(proveedor);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSupplier(null);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    alert("Exportando lista de proveedores...");
  };

  const handleAddSupplier = () => {
    setOpenDialog(true);
  };

  const categorias = [...new Set(proveedores.map(p => p.categoria))];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        {/* Header */}
        <SoftBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Gestión de Proveedores
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Administra proveedores, órdenes de compra y evaluaciones
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={loading}
            >
              Actualizar
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddSupplier}
            >
              Agregar Proveedor
            </Button>
          </Box>
        </SoftBox>

        {/* Métricas principales */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <SupplierMetricCard
              title="Total Proveedores"
              value={totalProveedores}
              subtitle={`${proveedoresActivos} activos`}
              icon={<Business />}
              color="primary"
              trend={8.2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SupplierMetricCard
              title="Órdenes Activas"
              value={ordenesPendientes}
              subtitle="En proceso"
              icon={<ShoppingCart />}
              color="info"
              trend={12.5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SupplierMetricCard
              title="Valor Total"
              value={`$${Math.round(valorTotal / 1000)}K`}
              subtitle="En inventario"
              icon={<AttachMoney />}
              color="success"
              trend={15.3}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SupplierMetricCard
              title="Rating Promedio"
              value={ratingPromedio.toFixed(1)}
              subtitle="⭐ Calificación"
              icon={<Star />}
              color="warning"
              trend={3.1}
            />
          </Grid>
        </Grid>

        {/* Gráficos y filtros */}
        <Grid container spacing={3} mb={4}>
          {/* Gráfico de categorías */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Valor por Categoría
                </Typography>
                <CategoryChart data={topCategorias} />
              </CardContent>
            </Card>
          </Grid>

          {/* Órdenes recientes */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Órdenes Recientes
                </Typography>
                <Box>
                  {ordenesRecientes.slice(0, 5).map((orden, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {orden.id}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {orden.proveedor}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="body2" fontWeight="bold">
                          ${orden.total.toLocaleString()}
                        </Typography>
                        <Chip 
                          label={orden.estado} 
                          size="small" 
                          color={orden.estado === "Entregado" ? "success" : "warning"}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Filtros */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Filtros de Búsqueda
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Buscar proveedor..."
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
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        value={filtroCategoria}
                        label="Categoría"
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                      >
                        <MenuItem value="">Todas las categorías</MenuItem>
                        {categorias.map((categoria) => (
                          <MenuItem key={categoria} value={categoria}>
                            {categoria}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={filtroEstado}
                        label="Estado"
                        onChange={(e) => setFiltroEstado(e.target.value)}
                      >
                        <MenuItem value="">Todos los estados</MenuItem>
                        <MenuItem value="Activo">Activo</MenuItem>
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="Inactivo">Inactivo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      {proveedoresFiltrados.length} proveedor(es) encontrado(s)
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabla de proveedores */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Lista de Proveedores
              </Typography>
              <Chip 
                icon={<FilterList />} 
                label={`${proveedoresFiltrados.length} proveedores`} 
                variant="outlined" 
              />
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Proveedor</TableCell>
                    <TableCell>Contacto</TableCell>
                    <TableCell align="center">Categoría</TableCell>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Órdenes</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {proveedoresPaginados.map((proveedor) => (
                    <TableRow key={proveedor.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {proveedor.nombre.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {proveedor.nombre}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {proveedor.totalProductos} productos
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {proveedor.contacto}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                            <Phone fontSize="small" sx={{ color: 'text.secondary' }} />
                            <Typography variant="caption" color="textSecondary">
                              {proveedor.telefono}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Email fontSize="small" sx={{ color: 'text.secondary' }} />
                            <Typography variant="caption" color="textSecondary">
                              {proveedor.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={proveedor.categoria} 
                          size="small" 
                          variant="outlined"
                          color="info"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <RatingDisplay rating={proveedor.rating} />
                      </TableCell>
                      <TableCell align="center">
                        <Badge badgeContent={proveedor.ordenesActivas} color="primary">
                          <LocalShipping color="action" />
                        </Badge>
                      </TableCell>
                      <TableCell align="center">
                        <EstadoChip estado={proveedor.estado} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, proveedor)}
                          size="small"
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={totalPaginas}
                  page={page}
                  onChange={(e, newPage) => setPage(newPage)}
                  color="primary"
                />
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Menú de acciones */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItemAction onClick={handleMenuClose}>
            <Visibility sx={{ mr: 1 }} />
            Ver Detalles
          </MenuItemAction>
          <MenuItemAction onClick={handleMenuClose}>
            <Edit sx={{ mr: 1 }} />
            Editar Proveedor
          </MenuItemAction>
          <MenuItemAction onClick={handleMenuClose}>
            <Inventory sx={{ mr: 1 }} />
            Ver Productos
          </MenuItemAction>
          <MenuItemAction onClick={handleMenuClose}>
            <Assessment sx={{ mr: 1 }} />
            Historial de Órdenes
          </MenuItemAction>
          <MenuItemAction onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} />
            Eliminar
          </MenuItemAction>
        </Menu>

        {/* Dialog para agregar proveedor */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Formulario para registrar un nuevo proveedor en el sistema.
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nombre de la empresa" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Persona de contacto" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Teléfono" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Dirección" multiline rows={2} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select label="Categoría">
                    {categorias.map((categoria) => (
                      <MenuItem key={categoria} value={categoria}>
                        {categoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Agregar Proveedor
            </Button>
          </DialogActions>
        </Dialog>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Proveedores;