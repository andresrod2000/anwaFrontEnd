import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Divider,
  LinearProgress
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  People,
  Assessment,
  FileDownload,
  Refresh,
  DateRange
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Datos dummy para las ventas
const salesData = [
  { mes: "Ene", ventas: 45000, ordenes: 120, margen: 15000 },
  { mes: "Feb", ventas: 52000, ordenes: 145, margen: 18200 },
  { mes: "Mar", ventas: 48000, ordenes: 132, margen: 16800 },
  { mes: "Abr", ventas: 61000, ordenes: 167, margen: 21350 },
  { mes: "May", ventas: 55000, ordenes: 154, margen: 19250 },
  { mes: "Jun", ventas: 67000, ordenes: 189, margen: 23450 }
];

const topProductos = [
  { nombre: "Smartphone Galaxy", ventas: 15420, unidades: 45, margen: "22%" },
  { nombre: "Laptop Gaming Pro", ventas: 12800, unidades: 16, margen: "18%" },
  { nombre: "Auriculares Wireless", ventas: 8950, unidades: 89, margen: "35%" },
  { nombre: "Tablet Ultra", ventas: 7200, unidades: 24, margen: "25%" },
  { nombre: "Smartwatch Elite", ventas: 6100, unidades: 31, margen: "28%" }
];

const ventasPorCategoria = [
  { categoria: "Electrónicos", ventas: 89000, color: "#8884d8" },
  { categoria: "Ropa", ventas: 67000, color: "#82ca9d" },
  { categoria: "Hogar", ventas: 45000, color: "#ffc658" },
  { categoria: "Deportes", ventas: 32000, color: "#ff7300" },
  { categoria: "Libros", ventas: 18000, color: "#8dd1e1" }
];

const ultimasVentas = [
  {
    id: "#12345",
    cliente: "Ana García",
    fecha: "2024-06-15",
    total: 1250.00,
    estado: "Completado",
    productos: 3
  },
  {
    id: "#12346",
    cliente: "Carlos López",
    fecha: "2024-06-15",
    total: 890.50,
    estado: "Pendiente",
    productos: 2
  },
  {
    id: "#12347",
    cliente: "María Rodríguez",
    fecha: "2024-06-14",
    total: 2100.00,
    estado: "Completado",
    productos: 5
  },
  {
    id: "#12348",
    cliente: "Juan Pérez",
    fecha: "2024-06-14",
    total: 456.75,
    estado: "Completado",
    productos: 1
  },
  {
    id: "#12349",
    cliente: "Laura Martín",
    fecha: "2024-06-13",
    total: 3200.00,
    estado: "Procesando",
    productos: 8
  }
];

// Componente para gráfico de línea simple
const SimpleLineChart = ({ data, height = 300 }) => {
  const maxValue = Math.max(...data.map(d => d.ventas));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (d.ventas / maxValue) * 80
  }));
  
  const pathData = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');
  
  return (
    <Box sx={{ width: "100%", height: height, position: "relative" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <path
          d={`${pathData} L 100 100 L 0 100 Z`}
          fill="url(#gradient)"
          stroke="#8884d8"
          strokeWidth="0.5"
        />
        <path
          d={pathData}
          fill="none"
          stroke="#8884d8"
          strokeWidth="1"
        />
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="1"
            fill="#8884d8"
          />
        ))}
      </svg>
      <Box 
        sx={{ 
          position: "absolute", 
          bottom: 10, 
          left: 0, 
          right: 0, 
          display: "flex", 
          justifyContent: "space-between",
          px: 2
        }}
      >
        {data.map((d, i) => (
          <Typography key={i} variant="caption" color="textSecondary">
            {d.mes}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

SimpleLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number
};

// Componente para gráfico de barras simple
const SimpleBarChart = ({ data, height = 350 }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.ventas, d.margen)));
  
  return (
    <Box sx={{ width: "100%", height: height, p: 2 }}>
      <Box display="flex" alignItems="end" height="80%" gap={2}>
        {data.map((item, index) => (
          <Box key={index} display="flex" flexDirection="column" alignItems="center" flex={1}>
            <Box display="flex" alignItems="end" height="100%" gap={0.5} width="100%">
              <Box
                sx={{
                  height: `${(item.ventas / maxValue) * 100}%`,
                  backgroundColor: "#8884d8",
                  flex: 1,
                  borderRadius: "2px 2px 0 0",
                  minHeight: "2px"
                }}
              />
              <Box
                sx={{
                  height: `${(item.margen / maxValue) * 100}%`,
                  backgroundColor: "#82ca9d",
                  flex: 1,
                  borderRadius: "2px 2px 0 0",
                  minHeight: "2px"
                }}
              />
            </Box>
            <Typography variant="caption" color="textSecondary" mt={1}>
              {item.mes}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" gap={3} mt={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 12, height: 12, backgroundColor: "#8884d8", borderRadius: "2px" }} />
          <Typography variant="caption">Ventas</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 12, height: 12, backgroundColor: "#82ca9d", borderRadius: "2px" }} />
          <Typography variant="caption">Margen</Typography>
        </Box>
      </Box>
    </Box>
  );
};

SimpleBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number
};

// Componente para gráfico de dona simple
const SimplePieChart = ({ data, height = 300 }) => {
  const total = data.reduce((sum, item) => sum + item.ventas, 0);
  let currentAngle = 0;
  
  const center = 50;
  const radius = 35;
  const innerRadius = 20;
  
  return (
    <Box sx={{ width: "100%", height: height, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="200" height="200" viewBox="0 0 100 100">
        {data.map((item, index) => {
          const percentage = (item.ventas / total) * 100;
          const angle = (percentage / 100) * 360;
          
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          const x1 = center + radius * Math.cos((startAngle - 90) * Math.PI / 180);
          const y1 = center + radius * Math.sin((startAngle - 90) * Math.PI / 180);
          const x2 = center + radius * Math.cos((endAngle - 90) * Math.PI / 180);
          const y2 = center + radius * Math.sin((endAngle - 90) * Math.PI / 180);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          currentAngle += angle;
          
          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              stroke="white"
              strokeWidth="0.5"
            />
          );
        })}
        <circle cx={center} cy={center} r={innerRadius} fill="white" />
      </svg>
      
      <Box mt={2}>
        {data.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} mb={0.5}>
            <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: "2px" }} />
            <Typography variant="caption">
              {item.categoria}: ${item.ventas.toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

SimplePieChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number
};

// Componente para las métricas principales
const MetricCard = ({ title, value, change, icon, color = "primary" }) => {
  const isPositive = change > 0;
  
  return (
    <Card sx={{ height: "100%", position: "relative", overflow: "visible" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {isPositive ? (
                <TrendingUp color="success" fontSize="small" />
              ) : (
                <TrendingDown color="error" fontSize="small" />
              )}
              <Typography 
                variant="body2" 
                color={isPositive ? "success.main" : "error.main"}
                ml={0.5}
              >
                {Math.abs(change)}% vs mes anterior
              </Typography>
            </Box>
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

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string
};

// Componente para el estado de las ventas
const EstadoChip = ({ estado }) => {
  const getColor = () => {
    switch (estado) {
      case "Completado": return "success";
      case "Pendiente": return "warning";
      case "Procesando": return "info";
      default: return "default";
    }
  };

  return <Chip label={estado} color={getColor()} size="small" />;
};

EstadoChip.propTypes = {
  estado: PropTypes.string.isRequired
};

function Ventas() {
  const [periodo, setPeriodo] = useState("6meses");
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    // Simulación de exportación
    alert("Exportando reporte de ventas...");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        {/* Header */}
        <SoftBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Dashboard de Ventas
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Resumen de rendimiento y métricas de ventas
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Período</InputLabel>
              <Select
                value={periodo}
                label="Período"
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <MenuItem value="7dias">Últimos 7 días</MenuItem>
                <MenuItem value="30dias">Últimos 30 días</MenuItem>
                <MenuItem value="6meses">Últimos 6 meses</MenuItem>
                <MenuItem value="año">Este año</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={loading}
            >
              Actualizar
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownload />}
              onClick={handleExport}
            >
              Exportar
            </Button>
          </Box>
        </SoftBox>

        {/* Métricas principales */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Ventas Totales"
              value="$67,000"
              change={12.5}
              icon={<AttachMoney />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Órdenes"
              value="189"
              change={8.2}
              icon={<ShoppingCart />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Clientes Únicos"
              value="156"
              change={15.3}
              icon={<People />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Margen Promedio"
              value="$23,450"
              change={-2.1}
              icon={<Assessment />}
              color="warning"
            />
          </Grid>
        </Grid>

        {/* Gráficos principales */}
        <Grid container spacing={3} mb={4}>
          {/* Gráfico de ventas por tiempo */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold">
                    Tendencia de Ventas
                  </Typography>
                  <Chip icon={<DateRange />} label="Últimos 6 meses" variant="outlined" />
                </Box>
                <SimpleLineChart data={salesData} height={300} />
              </CardContent>
            </Card>
          </Grid>

          {/* Ventas por categoría */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Ventas por Categoría
                </Typography>
                <SimplePieChart data={ventasPorCategoria} height={300} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Productos más vendidos y ventas recientes */}
        <Grid container spacing={3}>
          {/* Top productos */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Productos Más Vendidos
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Ventas</TableCell>
                        <TableCell align="right">Unidades</TableCell>
                        <TableCell align="right">Margen</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProductos.map((producto, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                                {index + 1}
                              </Avatar>
                              {producto.nombre}
                            </Box>
                          </TableCell>
                          <TableCell align="right" fontWeight="bold">
                            ${producto.ventas.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {producto.unidades}
                          </TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={producto.margen} 
                              color="success" 
                              variant="outlined" 
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Últimas ventas */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Últimas Ventas
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="center">Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ultimasVentas.map((venta, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold" color="primary">
                              {venta.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {venta.cliente}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {venta.productos} productos • {venta.fecha}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right" fontWeight="bold">
                            ${venta.total.toFixed(2)}
                          </TableCell>
                          <TableCell align="center">
                            <EstadoChip estado={venta.estado} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráfico de comparación mensual */}
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Análisis Comparativo Mensual
                </Typography>
                <SimpleBarChart data={salesData} height={350} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Ventas;