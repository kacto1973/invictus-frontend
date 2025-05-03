import React, { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import UnifiedSearchBox from "../components/UnifiedSearchBox";
import ReportTable from "../components/ReportTable";
import CardReport from "../components/CardReport";
import Button from "../components/Button";
import {fetchRemoveReport, fetchReports} from "../services/fetchers";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { matchSorter } from "match-sorter";

async function descargarConFetch(pdfUrl, nombre) {

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    // Crear el enlace invisible
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = nombre;
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error descargando el PDF:', error);
  }
}

const getFechaMasReciente = (report) => {

  const fechaReciente = report?.fechaGeneracion;

  if (!fechaReciente) return "No hay reportes disponibles";

  const fecha = new Date(fechaReciente);

  if (!fecha) return "No hay reportes disponibles";

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  return `Fecha: ${dia}/${mes}/${anio}`;
}

const getReporteMasReciente = (reports) => {
  const fechasOrdenadas = [...reports].sort((a, b) => {
    const fechaA = new Date(a.fechaGeneracion);
    const fechaB = new Date(b.fechaGeneracion);
    return fechaB - fechaA;
  });

  return fechasOrdenadas[0];
};

const Reports = () => {

  const queryClient = useQueryClient();
  const [editingReportId, setEditingReportId] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);

  const { data: reports = [], isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  const [searchValue, setSearchValue] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const reporteMasReciente = getReporteMasReciente(reports);
  const fechaMasReciente = getFechaMasReciente(reporteMasReciente);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const texto = e.target.value.trim();

            if (texto.includes("$")) {
                // Buscar por rango de fechas
                const [inicioStr, finStr] = texto.split("$");

                const parseFecha = (str) => {
                    const [dia, mes, anio] = str.split("/");
                    return new Date(`${anio}-${mes}-${dia}T00:00:00`);
                };

                const fechaInicio = parseFecha(inicioStr);
                const fechaFin = new Date(parseFecha(finStr));
                fechaFin.setHours(23, 59, 59, 999); // Asegura hasta el final del día

                const resultados = reports.filter((report) => {
                    const fechaReporte = new Date(report.fechaGeneracion);
                    return fechaReporte >= fechaInicio && fechaReporte <= fechaFin;
                });

                const resultadosOrdenados = resultados.sort((a, b) => {
                    const fechaA = new Date(a.fechaGeneracion);
                    const fechaB = new Date(b.fechaGeneracion);
                    return fechaB - fechaA; // Más nuevo primero
                });

                setFilteredReports(resultadosOrdenados);
            } else {
                // Buscar por nombre
                if (texto === "") {
                    setFilteredReports([]);
                    return;
                }

                const resultados = matchSorter(reports, texto.toLowerCase(), {
                    keys: [item => item.nombre.toLowerCase()],
                });

                const resultadosOrdenados = resultados.sort((a, b) => {
                    const fechaA = new Date(a.fechaGeneracion);
                    const fechaB = new Date(b.fechaGeneracion);
                    return fechaB - fechaA; // Más nuevo primero
                });

                setFilteredReports(resultadosOrdenados);
            }
        }
    };



    const handleDelete = async () => {
    if (!reporteMasReciente) return;

    try {
      await fetchRemoveReport(reporteMasReciente._id);
      await queryClient.invalidateQueries(["reports"]);
      setReportToDelete(null);
    } catch (error) {
      console.error("Error eliminando reporte:", error);
    }
  };

  if (isLoading) return <div>Cargando reportes...</div>;
  if (error) return <div>Error al cargar reportes</div>;

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer />
      <Header label="Reportes" />

      <div className="ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex">
        <div className="w-[50%] h-full flex flex-col p-5 pr-0 flex-shrink-0">
            <UnifiedSearchBox
                classNames="mb-5"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                endIcon={null}
                onKeyDown={handleKeyDown}
                onDateRangeSelected={(newValue) => setSearchValue(newValue)}
            />

            <div className="overflow-auto shadow-md rounded-lg"> {/* Le quite flex-1 y funciona */}
          <ReportTable
              onReportsClick={() => {}}
              reports={filteredReports.length > 0 ? filteredReports : reports} // Esta línea causa problemas / Cambiar por reports={reports}
              editingReportId={editingReportId}
              setEditingReportId={setEditingReportId}
              reportToDelete={reportToDelete}
              setReportToDelete={setReportToDelete}
          />
          </div>
        </div>


          <div className="w-[50%] h-[400px] flex flex-col p-10 pr-0 flex-shrink-0">
          <CardReport
              icon="svgs/information-green.svg"
              label="Reporte más reciente"
          >
            <p className="text-[#7D7D7D] text-sm mb-3 text-center">
              <span className="font-normal">{fechaMasReciente}</span>
            </p>

            <div className="flex items-center justify-center mb-5">
              <Button
                  icon="svgs/download.svg"
                  label={<span className="pl-6">Descargar ahora</span>}
                  onClick={async () => {
                    if (reporteMasReciente) {
                      await descargarConFetch(reporteMasReciente.urlReporte, reporteMasReciente.nombre);
                    }
                  }}
                  classNames={`w-[80%] h-[3rem] flex items-center justify-center gap-7 text-white font-normal ${
                      reporteMasReciente
                          ? "hover:bg-[#6FB847] bg-[#79CB4C] cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!reporteMasReciente}
              />
            </div>

            <div className="flex justify-center items-center relative w-full">
              {/* Rectángulo gris de fondo */}
              <div className="absolute bg-[#F5F5F5] rounded-lg w-[80%] h-[50%] z-0"></div>

              {/* Botones encima */}
              <div className="flex justify-center items-center gap-6 w-full py-2 z-10">
                <button
                    onClick={() => {
                      if (reporteMasReciente) {
                        window.open(reporteMasReciente.urlReporte, "_blank");
                      }
                    }}
                    disabled={!reporteMasReciente}
                    className={`hover:scale-110 transition-transform ${
                        reporteMasReciente ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  <img src="svgs/eye-yellowbox.svg" alt="Vista previa" className="w-8 h-8" />
                </button>

                <button
                    onClick={() => {
                      if (reporteMasReciente) {
                        setReportToDelete(reporteMasReciente);
                      }
                    }}
                    disabled={!reporteMasReciente}
                    className={`hover:scale-110 transition-transform ${
                        reporteMasReciente ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  <img src="svgs/trash-redbox.svg" alt="Eliminar reporte" className="w-8 h-8" />
                </button>

                <button
                    onClick={() => {
                      if (reporteMasReciente) {
                        setEditingReportId(reporteMasReciente._id);
                      }
                    }}
                    disabled={!reporteMasReciente}
                    className={`hover:scale-110 transition-transform ${
                        reporteMasReciente ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  <img src="svgs/rename-blue.svg" alt="Renombrar reporte" className="w-8 h-8" />
                </button>
              </div>
            </div>

          </CardReport>
        </div>
      </div>
    </div>
  );
};

export default Reports;
