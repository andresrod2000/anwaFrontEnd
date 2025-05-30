/**
=========================================================
* Soft UI Dashboard React - v420.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  20. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  20. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Usuarios from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Orders from "pages/pedidos/";
import Productos from "pages/productos/";
import { LayoutDashboard, Package, ShoppingCart, Users, Truck, Layers } from "lucide-react";
import Ventas  from "pages/ventas";
import Proveedores from "pages/proveedores";
import Categorias from "pages/categorias";
// Soft UI Dashboard React icons

import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import LoginPage from "pages/LoginPage";
const routes = [
  {
    type: "collapse",
    name: "inicio",
    key: "dashboard",
    route: "/dashboard",
    icon: <LayoutDashboard size="20px" />,
    component: <Dashboard />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Productos",
    key: "productos",
    route: "/productos",
    icon: <Package size="20px" />,
    component: <Productos />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Pedidos",
    key: "pedidos",
    route: "/pedidos",
    icon: <Package size="20px" />,
    component: <Orders />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Ventas",
    key: "ventas",
    route: "/ventas",
    icon: <ShoppingCart  size="20px" />,
    component: <Ventas />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    route: "/usuarios",
    icon: <Users  size="20px" />,
    component: <Usuarios />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Proveedores",
    key: "proveedores",
    route: "/proveedores",
    icon: <Truck  size="20px" />,
    component: <Proveedores />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Categorias",
    key: "categorias",
    route: "/categorias",
    icon: <Layers  size="20px" />,
    component: <Categorias />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "facturacíon",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="20px" />,
    component: <Billing />,
    noCollapse: true,
    private: true,
  },
 
 
  { type: "title", title: "paginas de cuenta", key: "account-pages" },
  {
    type: "collapse",
    name: "Auditoria",
    key: "auditoria",
    route: "/auditoria",
    icon: <CustomerSupport size="20px" />,
    component: <Profile />,
    noCollapse: true,
    private: true,
  },
  {
    type: "collapse",
    name: "Perfiles",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="20px" />,
    component: <Profile />,
    noCollapse: true,
    private: true,
  },
  { key: "login", route: "/login", component: <LoginPage />, private: false },


];


export default routes;
