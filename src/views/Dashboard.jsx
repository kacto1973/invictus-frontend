import React from "react";
import { useState, useEffect } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import Card from "../components/Card";
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
        <div
          className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden`}
        >
          <div className="flex flex-row w-full justify-around">
            <Card
              label="Card 1"
              icon="svgs/flask-blue.svg"
              classNames=" mt-10"
              
            />
            
            <Card
              label="Card 1"
              icon={"svgs/cube-add-green.svg"}
              classNames=" mt-10"
            />
            <Card
              label="Card 1"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10"
            />
          </div>
          <div className="flex flex-row w-full justify-around">
            <Card
              label="Card 1"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 w-[50%] h-[300px]"
            />
            <Card
              label="Card 1"
              icon={"svgs/flask-stripe-defect-ahh.svg"}
              classNames=" mt-10 w-[35%] h-[300px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
