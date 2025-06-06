import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import EquipmentPage from "./pages/EquipmentPage";
import InventoryPage from "./pages/InventoryPage";
import ConfigurationPage from "./pages/ConfigurationPage";
import ReportsPage from "./pages/ReportsPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<ConfigurationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;