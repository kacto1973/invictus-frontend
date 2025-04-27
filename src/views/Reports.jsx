import React, { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import UnifiedSearchBox from "../components/UnifiedSearchBox";
import ReportTable from "../components/ReportTable";
import CardReport from "../components/CardReport";
import Button from "../components/Button";
import { fetchReports } from "../services/fetchers";
import { useQuery } from "@tanstack/react-query";

const hola = [
  { _id: "RP001", nombre: "Reporte 11-03-25", fechaGeneracion: "11/03/25", estado: "Completado" },
  { id: "RP002", nombre: "Hola", fecha: "10/03/25", estado: "Completado" },
  { id: "RP003", nombre: "Este no se puede leer", fecha: "10/03/25", estado: "Error" },
  { id: "RP004", nombre: "Reporte 12-03-25", fecha: "02/02/25", estado: "Completado" },
  { id: "RP005", nombre: "Reporte 18-03-25", fecha: "18/03/25", estado: "En progreso" },
  { id: "RP006", nombre: "Reporte 19-03-25", fecha: "19/03/25", estado: "Completado" },
  { id: "RP007", nombre: "Reporte 20-03-25", fecha: "20/03/25", estado: "Completado" },
  { id: "RP008", nombre: "Reporte 20-03-25", fecha: "20/03/25", estado: "Error" },
  { id: "RP009", nombre: "Reporte 22-03-25", fecha: "22/03/25", estado: "Completado" },
  { id: "RP010", nombre: "añoña", fecha: "24/03/25", estado: "Completado" },
  { id: "RP011", nombre: "Reporte 28-03-25", fecha: "28/03/25", estado: "Completado" },
  { id: "RP012", nombre: "hola", fecha: "28/03/25", estado: "Error" }
];

const getFechaMasReciente = (reports) => {
  const fechasOrdenadas = [...reports].sort((a, b) => {
    const fechaA = new Date(a.fechaGeneracion); // o a.fechaGeneracion si usas esa propiedad
    const fechaB = new Date(b.fechaGeneracion);
    return fechaB - fechaA;
  });

  const fechaReciente = fechasOrdenadas[0]?.fechaGeneracion;

  // Formateamos a "dd/mm/aa"
  const fecha = new Date(fechaReciente);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = String(fecha.getFullYear()).slice(2);

  return `${dia}/${mes}/${anio}`;
};

const Reports = () => {

  const { data: reports = [], isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });
  
  console.log(reports);

  const [searchValue, setSearchValue] = useState("");
  const fechaMasReciente = getFechaMasReciente(reports);

  if (isLoading) return <div>Cargando reportes...</div>;
  if (error) return <div>Error al cargar reportes</div>;

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer />
      <Header label="Reportes" />

      <div className="ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex">
        <div className="w-[50%] h-full flex flex-col p-5 pr-0">
          {/* Nuevo SearchBox */}
          <UnifiedSearchBox
  classNames="mb-5"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  endIcon={
    <img src="/svgs/Frame.svg" alt="Calendario" className="w-8 h-8" />
  }
/>

          <ReportTable onReportsClick={() => {}} reports={reports} />
        </div>


        <div className="w-[50%] h-[400px] flex flex-col p-10 pr-0">
          <CardReport
            icon="svgs/information-green.svg"
            label="Reporte más reciente"
          >
            <p className="text-gray-700 text-sm mb-3 text-center">
              Fecha: <span className="font-normal">{fechaMasReciente}</span>
            </p>

            <div className="flex items-center justify-center mb-5">
              <Button
                icon="svgs/download.svg"
                label={<span className="pl-5">Descargar ahora</span>}
                onClick={() => alert("Se ha descargado el reporte")}
                classNames="hover:bg-[#6FB847] bg-[#79CB4C] w-[60%] h-[3rem] flex items-center justify-center gap-7 text-white font-normal"
              />
            </div>

            <div className="flex justify-center items-center gap-6">
              <button onClick={() => alert("Vista previa")} className="hover:scale-110 transition-transform">
                <img src="svgs/eye-yellowbox.svg" alt="Vista previa" className="w-8 h-8" />
              </button>
              <button onClick={() => alert("Eliminar reporte")} className="hover:scale-110 transition-transform">
                <img src="svgs/trash-redbox.svg" alt="Eliminar reporte" className="w-8 h-8" />
              </button>
              <button onClick={() => alert("Renombrar reporte")} className="hover:scale-110 transition-transform">
                <img src="svgs/rename-blue.svg" alt="Renombrar reporte" className="w-8 h-8" />
              </button>
            </div>
          </CardReport>
        </div>
      </div>
    </div>
  );
};

export default Reports;
