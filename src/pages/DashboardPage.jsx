import { useState, useEffect } from "react";
import Card from "../components/dashboard/Card";
import BarChart from "../components/dashboard/BarChart";
import PieChart from "../components/dashboard/PieChart";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../services/fetchers.js";

const DashboardPage = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {
    console.log(drawerOpened);
  }, [drawerOpened]);

  const {
    data: dataW,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dataW"],
    queryFn: fetchDashboard,
  });

  const orderedDataBarChart = dataW?.datosGraficaUnidadMedida
    ?.slice()
    ?.sort((a, b) => a._id.localeCompare(b._id));

  const orderedDataPieChart = dataW?.datosGraficaEstadoFisico
    ?.slice()
    ?.sort((a, b) => a._id.localeCompare(b._id));

  const dataBarChart = {
    labels: orderedDataBarChart?.map((item) => item._id),
    datasets: [
      {
        label: "Reactivos",
        data: orderedDataBarChart?.map((item) => item.totalCantidad),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsBarChart = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 18,
          },
        },
      },
      title: {
        display: true,
        text: "Distribución de Stock",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  const dataPieChart = {
    labels: orderedDataPieChart?.map((item) => item._id),
    datasets: [
      {
        label: "Reactivos por Estado Físico",
        data: orderedDataPieChart?.map((item) => item.totalCantidad),
        backgroundColor: ["red", "blue"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsPieChart = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Distribución de Stock",
      },
    },
  };

  return (
    <>
      <div className="bg-[#CAC9C9] w-screen h-screen relative m-0 overflow-hidden">
        {/* aqui vamos a meter todos los demas componentes q no son el header ni el drawer */}
        <div className="ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)]">
          <div className="flex flex-row w-full justify-around h-[35%]">
            <Card
              label="Total de Reactivos"
              icon="svgs/flask-blue.svg"
              classNames=" mt-10 h-[80%] w-[25%]"
              subClassNames="flex items-center justify-center"
            >
              <span className="text-[50px] font-semibold">
                {dataW?.TotalReactivos}
              </span>
            </Card>

            <Card
              label="Reactivos adquiridos"
              icon={"svgs/cube-add-green.svg"}
              classNames=" mt-10 h-[80%] w-[25%]"
              subClassNames="flex items-center justify-center"
            >
              <span className="text-[50px] font-semibold">
                {" "}
                {dataW?.TotalReactivosAdquiridos}
              </span>
            </Card>
            <Card
              label="Reactivos Agotados"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 h-[80%] w-[25%]"
              subClassNames="flex items-center justify-center"
            >
              <span className="text-[50px] font-semibold">
                {dataW?.TotalReactivosAgotados}
              </span>
            </Card>
          </div>
          <div className="flex flex-row w-full justify-around h-[65%]">
            <Card
              label="Distribución de Stock"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 w-[50%] h-[80%]"
              subClassNames="flex items-center justify-center"
            >
              <BarChart data={dataBarChart} options={optionsBarChart} />
            </Card>
            <Card
              label="Distribución de Reactivos"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 w-[40%] h-[80%]"
              subClassNames="flex items-center justify-center"
            >
              <div className="h-[90%] w-full flex justify-center">
                <PieChart
                  data={dataPieChart}
                  options={optionsPieChart}
                ></PieChart>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
