import React, { useEffect } from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReportTable from "../components/ReportTable";
import Card from "../components/Card"; // Asegúrate de importar Card

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportSelection = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer />
      <Header label="Reportes" />
      {/* div padre de todo lo demás */}
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
      >
        <div className="w-[50%] h-full flex flex-col p-5 pr-0">
          <SearchBox classNames="w-full h-[3rem] mb-5" />
          <ReportTable onReportsClick={handleReportSelection} />
        </div>

        <div className="w-[50%] h-full flex flex-col p-10 pr-0">
          <Card
            icon="svgs/information.svg" 
            label="Reporte más reciente"
            
          >
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;

