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
  Pagination,
  InputAdornment,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
  Tooltip
} from "@mui/material";
import {
  Category,
  Add,
  MoreVert,
  Search,
  FilterList,
  Download,
  Refresh,
  Restaurant,
  LocalDrink,
  Cake,
  FastFood,
  Edit,
  Visibility,
  Delete,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Inventory,
  Star,
  MenuBook,
  LocalOffer,
  BarChart,
  DragIndicator
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Datos dummy para categorías de restaurante
const categoriasData = [
  {
    id: 1,
    nombre: "Hamburguesas",
    descripcion: "Deliciosas hamburguesas gourmet con ingredientes frescos",
    icono: "🍔",
    color: "#FF6B35",
    activa: true,
    productos: 12,
    ventasHoy: 45,
    ventasMes: 1350,
    ingresosMes: 24300,
    popularidad: 95,
    orden: 1,
    fechaCreacion: "2024-01-15",
    categoria_padre: null,
    promocion: true
  },
  {
    id: 2,
    nombre: "Perros Calientes",
    descripcion: "Tradicionales perros con múltiples opciones de salsas",
    icono: "🌭",
    color: "#F7931E",
    activa: true,
    productos: 8,
    ventasHoy: 32,
    ventasMes: 960,
    ingresosMes: 12480,
    popularidad: 78,
    orden: 2,
    fechaCreacion: "2024-01-15",
    categoria_padre: null,
    promocion: false
  },
  {
    id: 3,
    nombre: "Bebidas",
    descripcion: "Refrescantes bebidas naturales y gaseosas",
    icono: "🥤",
    color: "#4A90E2",
    activa: true,
    productos: 15,
    ventasHoy: 78,
    ventasMes: 2340,
    ingresosMes: 9360,
    popularidad: 88,
    orden: 3,
    fechaCreacion: "2024-01-15",
    categoria_padre: null,
    promocion: false
  },
  {
    id: 4,
    nombre: "Postres",
    descripcion: "Deliciosos postres caseros para cerrar con broche de oro",
    icono: "🍰",
    color: "#E91E63",
    activa: true,
    productos: 6,
    ventasHoy: 18,
    ventasMes: 540,
    ingresosMes: 8100,
    popularidad: 65,
    orden: 4,
    fechaCreacion: "2024-01-20",
    categoria_padre: null,
    promocion: true
  },
  {
    id: 5,
    nombre: "Entradas",
    descripcion: "Aperitivos perfectos para compartir",
    icono: "🍤",
    color: "#9C27B0",
    activa: true,
    productos: 10,
    ventasHoy: 25,
    ventasMes: 750,
    ingresosMes: 11250,
    popularidad: 72,
    orden: 5,
    fechaCreacion: "2024-02-01",
    categoria_padre: null,
    promocion: false
  },
  {
    id: 6,
    nombre: "Ensaladas",
    descripcion: "Ensaladas frescas y saludables",
    icono: "🥗",
    color: "#4CAF50",
    activa: true,
    productos: 7,
    ventasHoy: 14,
    ventasMes: 420,
    ingresosMes: 6720,
    popularidad: 58,
    orden: 6,
    fechaCreacion: "2024-02-10",
    categoria_padre: null,
    promocion: false
  },
  {
    id: 7,
    nombre: "Acompañamientos",
    descripcion: "Perfectos complementos para tus platos principales",
    icono: "🍟",
    color: "#FF9800",
    activa: true,
    productos: 9,
    ventasHoy: 56,
    ventasMes: 1680,
    ingresosMes: 8400,
    popularidad: 82,
    orden: 7,
    fechaCreacion: "2024-01-15",
    categoria_padre: null,
    promocion: false
  },
  {
    id: 8,
    nombre: "Especialidades",
    descripcion: "Platos únicos de la casa",
    icono: "⭐",
    color: "#607D8B",
    activa: false,
    productos: 4,
    ventasHoy: 0,
    ventasMes: 0,
    ingresosMes: 0,
    popularidad: 0,
    orden: 8,
    fechaCreacion: "2024-03-01",
    categoria_padre: null,
    promocion: false
  }
];

// Datos para métricas
const ventasPorHora = [
  { hora: "08:00", ventas: 12 },
  { hora: "09:00", ventas: 8 },
  { hora: "10:00", ventas: 15 },
  { hora: "11:00", ventas: 28 },
  { hora: "12:00", ventas: 45 },
  { hora: "13:00", ventas: 52 },
  { hora: "14:00", ventas: 38 },
  { hora: "15:00", ventas: 22 },
  { hora: "16:00", ventas: 18 },
  { hora: "17:00", ventas: 25 },
  { hora: "18:00", ventas: 42 },
  { hora: "19:00", ventas: 48 },
  { hora: "20:00", ventas: 35 },
  { hora: "21:00", ventas: 28 }
];

const topProductos = [
  { categoria: "Hamburguesas", producto: "Big Burger Clásica", ventas: 125, ingreso: 2250 },
  { categoria: "Acompañamientos", producto: "Papas Fritas Grandes", ventas: 98, ingreso: 980 },
  { categoria: "Bebidas", producto: "Coca Cola 500ml", ventas: 89, ingreso: 356 },
  { categoria: "Perros Calientes", producto: "Perro Tradicional", ventas: 76, ingreso: 912 },
  { categoria: "Entradas", producto: "Aros de Cebolla", ventas: 54, ingreso: 810 }
];

// Componente para métricas de categorías
const CategoryMetricCard = ({ title, value, icon, color = "primary", subtitle = "", trend = null }) => {
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
                {trend > 0 ? (
                  <TrendingUp color="success" fontSize="small" />
                ) : (
                  <TrendingDown color="error" fontSize="small" />
                )}
                <Typography 
                  variant="body2" 
                  color={trend > 0 ? "success.main" : "error.main"} 
                  ml={0.5}
                >
                  {Math.abs(trend)}% vs ayer
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

CategoryMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  subtitle: PropTypes.string,
  trend: PropTypes.number
};

// Componente para gráfico de ventas por hora
const SalesHourChart = ({ data }) => {
  const maxVentas = Math.max(...data.map(d => d.ventas));
  
  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="end" height={200} gap={1}>
        {data.map((item, index) => (
          <Tooltip key={index} title={`${item.hora}: ${item.ventas} ventas`}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <Box
                sx={{
                  height: `${(item.ventas / maxVentas) * 150}px`,
                  backgroundColor: "#8884d8",
                  width: "100%",
                  borderRadius: "2px 2px 0 0",
                  minHeight: "2px",
                  mb: 1,
                  '&:hover': {
                    backgroundColor: "#7070d8"
                  }
                }}
              />
              <Typography variant="caption" color="textSecondary" fontSize="10px">
                {item.hora.slice(0, 2)}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

SalesHourChart.propTypes = {
  data: PropTypes.array.isRequired
};

// Componente para chip de popularidad
const PopularityChip = ({ popularidad }) => {
  const getColor = () => {
    if (popularidad >= 80) return "success";
    if (popularidad >= 60) return "warning";
    return "error";
  };
  
  return (
    <Chip 
      label={`${popularidad}%`} 
      color={getColor()} 
      size="small" 
      icon={<Star fontSize="small" />}
    />
  );
};

PopularityChip.propTypes = {
  popularidad: PropTypes.number.isRequired
};

// Componente para tarjeta de categoría
const CategoryCard = ({ categoria, onEdit, onDelete, onToggleStatus }) => {
  return (
    <Card 
      sx={{ 
        height: "100%", 
        position: "relative",
        border: categoria.promocion ? "2px solid #FF6B35" : "1px solid #e0e0e0",
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        },
        transition: 'all 0.3s ease'
      }}
    >
      {categoria.promocion && (
        <Chip 
          label="PROMOCIÓN" 
          color="error" 
          size="small" 
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        />
      )}
      
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar 
            sx={{ 
              bgcolor: categoria.color, 
              width: 48, 
              height: 48,
              fontSize: "1.5rem"
            }}
          >
            {categoria.icono}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="bold">
              {categoria.nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {categoria.descripcion}
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={categoria.activa}
                onChange={() => onToggleStatus(categoria.id)}
                color="primary"
              />
            }
            label=""
            sx={{ margin: 0 }}
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Productos
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {categoria.productos}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Ventas Hoy
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {categoria.ventasHoy}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Ingresos Mes
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="success.main">
              ${categoria.ingresosMes.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">
              Popularidad
            </Typography>
            <Box mt={0.5}>
              <PopularityChip popularidad={categoria.popularidad} />
            </Box>
          </Grid>
        </Grid>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="caption" color="textSecondary">
            Orden: #{categoria.orden}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(categoria)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(categoria.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CategoryCard.propTypes = {
  categoria: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
};

function Categorias() {
  const [categorias, setCategorias] = useState(categoriasData);
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const categoriasPorPagina = 6;

  // Filtrar categorías
  const categoriasFiltradas = categorias.filter(categoria => {
    const matchBusqueda = categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         categoria.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === "" || 
                       (filtroEstado === "activa" && categoria.activa) ||
                       (filtroEstado === "inactiva" && !categoria.activa);
    return matchBusqueda && matchEstado;
  });

  // Paginación
  const totalPaginas = Math.ceil(categoriasFiltradas.length / categoriasPorPagina);
  const categoriasPaginadas = categoriasFiltradas.slice(
    (page - 1) * categoriasPorPagina,
    page * categoriasPorPagina
  );

  // Métricas calculadas
  const totalCategorias = categorias.length;
  const categoriasActivas = categorias.filter(c => c.activa).length;
  const totalProductos = categorias.reduce((sum, c) => sum + c.productos, 0);
  const ventasHoy = categorias.reduce((sum, c) => sum + c.ventasHoy, 0);
  const ingresosHoy = categorias.reduce((sum, c) => sum + (c.ventasHoy * 15), 0); // Estimado
  const ingresosMes = categorias.reduce((sum, c) => sum + c.ingresosMes, 0);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    alert("Exportando categorías del menú...");
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setOpenDialog(true);
  };

  const handleEditCategory = (categoria) => {
    setEditingCategory(categoria);
    setOpenDialog(true);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      setCategorias(categorias.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setCategorias(categorias.map(c => 
      c.id === id ? { ...c, activa: !c.activa } : c
    ));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        {/* Header */}
        <SoftBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Categorías del Menú
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Gestiona las categorías de productos de tu restaurante
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
              onClick={handleAddCategory}
            >
              Nueva Categoría
            </Button>
          </Box>
        </SoftBox>

        {/* Métricas principales */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <CategoryMetricCard
              title="Total Categorías"
              value={totalCategorias}
              subtitle={`${categoriasActivas} activas`}
              icon={<Category />}
              color="primary"
              trend={5.2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CategoryMetricCard
              title="Productos"
              value={totalProductos}
              subtitle="En todas las categorías"
              icon={<MenuBook />}
              color="info"
              trend={8.1}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CategoryMetricCard
              title="Ventas Hoy"
              value={ventasHoy}
              subtitle={`$${ingresosHoy.toLocaleString()}`}
              icon={<Restaurant />}
              color="success"
              trend={12.5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CategoryMetricCard
              title="Ingresos Mes"
              value={`$${Math.round(ingresosMes / 1000)}K`}
              subtitle="Total facturado"
              icon={<AttachMoney />}
              color="warning"
              trend={-2.3}
            />
          </Grid>
        </Grid>

        {/* Gráficos y análisis */}
        <Grid container spacing={3} mb={4}>
          {/* Gráfico de ventas por hora */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Ventas por Hora - Hoy
                </Typography>
                <SalesHourChart data={ventasPorHora} />
              </CardContent>
            </Card>
          </Grid>

          {/* Top productos */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Top Productos del Mes
                </Typography>
                <Box>
                  {topProductos.map((producto, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {producto.producto}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {producto.categoria}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="body2" fontWeight="bold">
                          {producto.ventas}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          ${producto.ingreso}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Buscar categoría..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={filtroEstado}
                    label="Estado"
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    <MenuItem value="activa">Activas</MenuItem>
                    <MenuItem value="inactiva">Inactivas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Chip 
                  icon={<FilterList />} 
                  label={`${categoriasFiltradas.length} categorías`} 
                  variant="outlined" 
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Grid de categorías */}
        <Grid container spacing={3} mb={4}>
          {categoriasPaginadas.map((categoria) => (
            <Grid item xs={12} sm={6} lg={4} key={categoria.id}>
              <CategoryCard
                categoria={categoria}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onToggleStatus={handleToggleStatus}
              />
            </Grid>
          ))}
        </Grid>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <Box display="flex" justifyContent="center" mb={3}>
            <Pagination
              count={totalPaginas}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              color="primary"
            />
          </Box>
        )}

        {/* Dialog para agregar/editar categoría */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={8}>
                <TextField 
                  fullWidth 
                  label="Nombre de la categoría" 
                  defaultValue={editingCategory?.nombre || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  fullWidth 
                  label="Emoji/Icono" 
                  defaultValue={editingCategory?.icono || "🍽️"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  label="Descripción" 
                  multiline 
                  rows={2}
                  defaultValue={editingCategory?.descripcion || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label="Color (hex)" 
                  defaultValue={editingCategory?.color || "#FF6B35"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label="Orden" 
                  type="number"
                  defaultValue={editingCategory?.orden || categorias.length + 1}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked={editingCategory?.activa !== false} />}
                  label="Categoría activa"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked={editingCategory?.promocion || false} />}
                  label="Marcar como promoción especial"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              {editingCategory ? "Actualizar" : "Crear Categoría"}
            </Button>
          </DialogActions>
        </Dialog>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Categorias;