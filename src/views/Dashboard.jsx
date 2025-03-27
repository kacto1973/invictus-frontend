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
      <div className="bg-[#EDEDED] w-screen h-screen">
        <Card></Card>
        <TemporaryDrawer isOpen={true}></TemporaryDrawer>
        <Header label="Home"></Header>
        {/*
      <img
        src="svgs/arrow-right-black.svg"
        alt="arrow icon"
        width={30}
        className="absolute left-4 top-4 cursor-pointer"
        onClick={() => setDrawerOpened(!drawerOpened)}
      />
      */}
      </div>
      ;
    </>
  );
};

export default Dashboard;
