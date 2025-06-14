// routes.js
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import TransactionsPage from "../pages/TransactionsPage";
import EquipmentPage from "../pages/EquipmentPage";
import ReportsPage from "../pages/ReportsPage";
import ConfigurationPage from "../pages/ConfigurationPage";

const routes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/inventory", element: <InventoryPage /> },
  { path: "/equipment", element: <EquipmentPage /> },
  { path: "/reports", element: <ReportsPage /> },
  { path: "/settings", element: <ConfigurationPage /> },
  { path: "/transactions", element: <TransactionsPage /> },
];

export default routes;
