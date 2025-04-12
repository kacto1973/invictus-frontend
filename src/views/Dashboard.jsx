import React from "react";
import { useState, useEffect } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import Card from "../components/Card";
import BarChart from "../components/BarChart.jsx";
import PieChart from "../components/PieChart.jsx";

const Dashboard = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {
    console.log(drawerOpened);
  }, [drawerOpened]);

  return (
    <>
      <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
        <TemporaryDrawer isOpen={true}></TemporaryDrawer>
        <Header label="Home"></Header>

        {/* aqui vamos a meter todos los demas componentes q no son el header ni el drawer */}
        <div className="ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)]">
          <div className="flex flex-row w-full justify-around h-[35%]">
            <Card
              label="Total de Reactivos"
              icon="svgs/flask-blue.svg"
              classNames=" mt-10 h-[80%] w-[25%]"
              subClassNames="flex items-center justify-center"
            >
              <span className="text-[50px] font-semibold">1000</span>
            </Card>

            <Card
              label="Reactivos adquiridos"
              icon={"svgs/cube-add-green.svg"}
              classNames=" mt-10 h-[80%] w-[25%]"
              subClassNames="flex items-center justify-center"
            >
              <span className="text-[50px] font-semibold">1000</span>
            </Card>
            <Card
              label="Reactivos Agotados"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 h-[80%] w-[25%]"
              subClassNames="flex items-center justify-center"
            >
              <span className="text-[50px] font-semibold">1000</span>
            </Card>
          </div>
          <div className="flex flex-row w-full justify-around h-[65%]">
            <Card
              label="Distribución de Stock"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 w-[50%] h-[80%]"
              subClassNames="flex items-center justify-center"
            >
              <BarChart />
            </Card>
            <Card
              label="Distribución de Reactivos"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 w-[40%] h-[80%]"
              subClassNames="flex items-center justify-center"
            >
              <div className="h-[90%] w-full flex justify-center">
                <PieChart></PieChart>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
