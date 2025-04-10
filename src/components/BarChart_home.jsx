import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los elementos necesarios de Chart.js
ChartJS.register(CategoryScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Histogram Example",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Hace que el gráfico sea sensible al tamaño del contenedor
    maintainAspectRatio: false, // Permite que el gráfico se ajuste a su contenedor
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
