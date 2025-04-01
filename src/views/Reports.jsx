import React, { useEffect } from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReportTable from "../components/ReportTable";


const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null);
  
    const handleReportSelection = (report) => {
      setSelectedReport(report);
    };
  
    return (
      <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
        <TemporaryDrawer></TemporaryDrawer>
        <Header label="Reportes"></Header>
        {/*div padre de todo lo demas */}
        <div
          className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
        >
          <div className="w-[35%] h-full flex flex-col p-5 pr-0">
            <SearchBox classNames="w-full h-[3rem] mb-5"></SearchBox>
            <ReportTable>
              onReportsClick={handleReportSelection}
           </ReportTable>
          </div>
        </div>
      </div>
    );
  };
  
  export default Reports;
  
