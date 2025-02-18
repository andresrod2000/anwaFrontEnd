/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import React, { useEffect, useState } from "react";

function Tables() {
  // Estado para las columnas y filas
  const [columns, setColumns] = useState([
    { name: "Nombre", accessor: "nombre", align: "left" },
    { name: "Correo", accessor: "correo", align: "left" },
    { name: "Rol", accessor: "rol", align: "left" },
  ]);
  

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://3.133.144.184:8000/api/usuarios/");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
    
        console.log("Datos recibidos de la API:", data); // 🟢 DEPURACIÓN
    
        const transformedRows = data.map((user) => ({
          nombre: user.nombre ? user.nombre.toUpperCase() : "SIN NOMBRE",
          correo: user.correo || "SIN CORREO",
          rol: obtenerRol(user.rol) || "Desconocido",
        }));
    
        console.log("Datos transformados para la tabla:", transformedRows); // 🟢 DEPURACIÓN
    
        setRows(transformedRows);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    

    fetchUsers();
  }, []);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Tabla Usuarios</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              {rows.length > 0 ? (
                <Table columns={columns} rows={rows} />
              ) : (
                <SoftTypography variant="body2">Cargando datos...</SoftTypography>
              )}
            </SoftBox>
          </Card>
        </SoftBox>
        {/* <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Projects Table</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </SoftBox>
        </Card> */}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
