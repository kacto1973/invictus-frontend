import React from "react";
import { useState, useEffect } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
const Dashboard = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {
    console.log(drawerOpened);
  }, [drawerOpened]);

  return (
    <>
      <TemporaryDrawer isOpen={drawerOpened}></TemporaryDrawer>
      <img
        src="svgs/arrow-right-black.svg"
        alt="arrow icon"
        width={30}
        className="absolute left-4 top-4 cursor-pointer"
        onClick={() => setDrawerOpened(!drawerOpened)}
      />
      <div className="bg-[#EDEDED] w-screen h-screen"></div>;
    </>
  );
};

export default Dashboard;
