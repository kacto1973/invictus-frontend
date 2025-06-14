// routes.js
import Dashboard from "../views/Dashboard";
import Inventory from "../views/Inventory";
import Transactions from "../views/Transactions";
import Equipment from "../views/Equipment";
import Reports from "../views/Reports";
import Configuration from "../views/Configuration";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/inventory", element: <Inventory /> },
  { path: "/equipment", element: <Equipment /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Configuration /> },
  { path: "/transactions", element: <Transactions /> },
];

export default routes;
