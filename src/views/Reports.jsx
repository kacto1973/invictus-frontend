import React, { useEffect } from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReportTable from "../components/ReportTable";
import CardReport from "../components/CardReport"; // Asegúrate de importar Card
import Button from "../components/Button";

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

        <div className="w-[50%] h-[700px] flex flex-col p-10 pr-0">
          <CardReport
            icon="svgs/information-green.svg" 
            label="Reporte más reciente"
            
          >
            <div className="flex items-center justify-between mt-5">
            <Button
          icon="svgs/download.svg"
          label={<span className="pl-2">Descargar ahora</span>}
          onClick={() => alert("Se ha descargado el reporte")}
         classNames="hover:bg-[#6FB847] bg-[#79CB4C] w-[50%] h-[3rem] mb-9 ml-25 flex items-center justify-center gap-7 text-white font-normal"
         
        />




          </div>
          </CardReport>
        </div>
      </div>
    </div>
  );
};

export default Reports;

