import React, { useEffect, useState, useContext } from "react";
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
  Alert,
  Skeleton,
  Pagination,
  InputAdornment
} from "@mui/material";
import {
  People,
  PersonAdd,
  SupervisorAccount,
  Person,
  Edit,
  Add,
  MoreVert,
  Search,
  FilterList,
  Download,
  Block,
  CheckCircle,
  Email,
  Badge,
  Refresh
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import AuthContext from "../../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Componente para métricas de usuarios
const UserMetricCard = ({ title, value, icon, color = "primary", subtitle = "" }) => {
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

UserMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  subtitle: PropTypes.string
};

// Componente para el gráfico de roles
const RoleDistributionChart = ({ data }) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658"];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ flex: 1, textAlign: "center" }}>
            <Box 
              sx={{ 
                height: `${(item.value / total) * 100 + 20}px`,
                backgroundColor: colors[index],
                borderRadius: "4px 4px 0 0",
                mb: 1,
                minHeight: "20px",
                maxHeight: "80px"
              }} 
            />
            <Typography variant="caption" fontWeight="bold">
              {item.value}
            </Typography>
            <Typography variant="caption" display="block" color="textSecondary">
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

RoleDistributionChart.propTypes = {
  data: PropTypes.array.isRequired
};

// Componente para chip de rol
const RoleChip = ({ rol }) => {
  const getRoleConfig = () => {
    switch (rol) {
      case "Administrador":
        return { color: "error", icon: <SupervisorAccount fontSize="small" /> };
      case "Editor":
        return { color: "warning", icon: <Edit fontSize="small" /> };
      case "Usuario":
        return { color: "info", icon: <Person fontSize="small" /> };
      default:
        return { color: "default", icon: <Person fontSize="small" /> };
    }
  };

  const config = getRoleConfig();
  
  return (
    <Chip 
      label={rol} 
      color={config.color} 
      icon={config.icon}
      size="small" 
      variant="outlined"
    />
  );
};

RoleChip.propTypes = {
  rol: PropTypes.string.isRequired
};

function Usuarios() {
  const { token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroRol, setFiltroRol] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const usuariosPorPagina = 10;

  useEffect(() => {
    fetchUsuarios();
  }, [token]);

  const fetchUsuarios = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/usuarios/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const usuariosFormateados = data.map((user) => ({
        id: user.id,
        nombre: user.nombre ? user.nombre.toUpperCase() : "SIN NOMBRE",
        correo: user.correo || "SIN CORREO",
        rol: obtenerRol(user.rol),
        rolNumerico: user.rol,
        fechaRegistro: user.fecha_registro || new Date().toISOString(),
        activo: user.activo !== false // Asumimos activo por defecto
      }));
      
      setUsuarios(usuariosFormateados);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setError("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const obtenerRol = (rol) => {
    switch (rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Editor";
      case 3:
        return "Usuario";
      default:
        return "Desconocido";
    }
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(user => {
    const matchBusqueda = user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         user.correo.toLowerCase().includes(busqueda.toLowerCase());
    const matchRol = filtroRol === "" || user.rol === filtroRol;
    return matchBusqueda && matchRol;
  });

  // Paginación
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
    (page - 1) * usuariosPorPagina,
    page * usuariosPorPagina
  );

  // Métricas calculadas
  const totalUsuarios = usuarios.length;
  const usuariosActivos = usuarios.filter(u => u.activo).length;
  const administradores = usuarios.filter(u => u.rol === "Administrador").length;
  const editores = usuarios.filter(u => u.rol === "Editor").length;
  const usuariosRegulares = usuarios.filter(u => u.rol === "Usuario").length;

  // Datos para el gráfico de roles
  const rolesData = [
    { name: "Admin", value: administradores },
    { name: "Editor", value: editores },
    { name: "Usuario", value: usuariosRegulares }
  ];

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setOpenDialog(true);
  };

  const handleExport = () => {
    // Simulación de exportación
    alert("Exportando lista de usuarios...");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={4}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Skeleton variant="rectangular" height={120} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
          </Grid>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        {/* Header */}
        <SoftBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Gestión de Usuarios
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Administra los usuarios y sus permisos del sistema
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchUsuarios}
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
              startIcon={<PersonAdd />}
              onClick={handleAddUser}
            >
              Agregar Usuario
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
            <UserMetricCard
              title="Total Usuarios"
              value={totalUsuarios}
              subtitle={`${usuariosActivos} activos`}
              icon={<People />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserMetricCard
              title="Administradores"
              value={administradores}
              subtitle="Acceso completo"
              icon={<SupervisorAccount />}
              color="error"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserMetricCard
              title="Editores"
              value={editores}
              subtitle="Permisos limitados"
              icon={<Edit />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserMetricCard
              title="Usuarios"
              value={usuariosRegulares}
              subtitle="Solo lectura"
              icon={<Person />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Gráfico de distribución de roles */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Distribución por Roles
                </Typography>
                <RoleDistributionChart data={rolesData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Filtros y búsqueda */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Filtros y Búsqueda
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Buscar por nombre o correo..."
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
                      <InputLabel>Filtrar por Rol</InputLabel>
                      <Select
                        value={filtroRol}
                        label="Filtrar por Rol"
                        onChange={(e) => setFiltroRol(e.target.value)}
                      >
                        <MenuItem value="">Todos los roles</MenuItem>
                        <MenuItem value="Administrador">Administrador</MenuItem>
                        <MenuItem value="Editor">Editor</MenuItem>
                        <MenuItem value="Usuario">Usuario</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="textSecondary">
                      {usuariosFiltrados.length} usuario(s) encontrado(s)
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabla de usuarios */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Lista de Usuarios
              </Typography>
              <Chip 
                icon={<FilterList />} 
                label={`${usuariosFiltrados.length} usuarios`} 
                variant="outlined" 
              />
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Badge />
                        Usuario
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Email />
                        Correo
                      </Box>
                    </TableCell>
                    <TableCell align="center">Rol</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuariosPaginados.map((usuario) => (
                    <TableRow key={usuario.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {usuario.nombre.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {usuario.nombre}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              ID: {usuario.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {usuario.correo}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <RoleChip rol={usuario.rol} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={usuario.activo ? <CheckCircle /> : <Block />}
                          label={usuario.activo ? "Activo" : "Inactivo"}
                          color={usuario.activo ? "success" : "error"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, usuario)}
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
            <Edit sx={{ mr: 1 }} />
            Editar Usuario
          </MenuItemAction>
          <MenuItemAction onClick={handleMenuClose}>
            <Block sx={{ mr: 1 }} />
            {selectedUser?.activo ? "Desactivar" : "Activar"}
          </MenuItemAction>
        </Menu>

        {/* Dialog para agregar usuario */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary">
              Esta funcionalidad se implementaría conectando con el endpoint de creación de usuarios.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Usuarios;