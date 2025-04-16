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

const PieChart = ({ data, options }) => {
  /* const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Pie Chart Example",
        data: [300, 50, 100],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom", // <- esto mueve las etiquetas al fondo
        labels: {
          font: {
            size: 18,
          },
        },
      },
    },
  };
 */

  return <Pie data={data} options={options} />;
};

export default PieChart;
