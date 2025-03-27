import React from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
const Dashboard = () => {
  const [drawerOpened, setDrawerOpened] = useState(true);

  return (
    <>
      <TemporaryDrawer isOpen={drawerOpened}></TemporaryDrawer>
      <div className="bg-[#EDEDED] w-screen h-screen">Dashboard</div>;
    </>
  );
};

export default Dashboard;
