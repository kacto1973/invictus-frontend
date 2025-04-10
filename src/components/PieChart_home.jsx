import React from "react";
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

const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Pie Chart Example",
        data: [300, 50, 100],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
