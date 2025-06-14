import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los elementos necesarios de Chart.js
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  
  return <Pie data={data} options={options} />;
};

export default PieChart;
