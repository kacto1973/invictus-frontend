import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useState } from "react";
import {fetchRemoveReport, fetchChangeReportName, fetchCreateReport} from "../services/fetchers";
import { useQueryClient } from "@tanstack/react-query";

function formatearFecha(fechaObj) {
  const fecha = new Date(fechaObj);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C796EB",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getEstadoEstilo = (estado) => {
  let backgroundColor;
  switch (estado) {
    case "Completado":
      backgroundColor = "#d8ecdc";
      break;
    case "Error":
      backgroundColor = "#ffd4dc";
      break;
    case "En proceso":
      backgroundColor = "#FFF3CD";
      break;
    default:
      backgroundColor = "inherit";
  }

  return {
    backgroundColor,
    color: "black",
    padding: "4px 10px",
    borderRadius: "15px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100px",
    textAlign: "center",
    fontWeight: "normal",
  };
};

const buttonStyle = {
  padding: "4px 8px",
  color: "#555",
  backgroundColor: "#e0e0e0",
  "&:hover": {
    backgroundColor: "#d5d5d5",
  },
  textTransform: "none",
  fontSize: "12px",
  borderRadius: "6px",
  minWidth: "unset",
  justifyContent: "flex-start",
};

export default function CustomizedTables({ onReportClick, reports, setReports, editingReportId, setEditingReportId,
                                           reportToDelete, setReportToDelete}) {
  const [openModal, setOpenModal] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState({});
  const [newReportName, setNewReportName] = useState("");
  const [selectedItems, setSelectedItems] = useState({}); // controlamos el estado de cada ícono
  const queryClient = useQueryClient();
  // const [editingReportId, setEditingReportId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [disableAnimationOnClose, setDisableAnimationOnClose] = useState(false);

  React.useEffect(() => {
    if (editingReportId) {
      const report = reports.find(r => r._id === editingReportId);
      if (report) setEditingName(report.nombre);
    }
  }, [editingReportId, reports]);

  React.useEffect(() => {
    async function eliminar() {
        try {
          await fetchRemoveReport(reportToDelete._id);
          await queryClient.invalidateQueries(["reports"]);
          setReportToDelete(null);
        } catch (error) {
          console.error("Error eliminando reporte:", error);
        }
    }
    if (reportToDelete) {
      eliminar();
    }
  }, [reportToDelete, reports, queryClient, setReportToDelete]);

  const handleAddOpen = (event) => setAddAnchorEl(event.currentTarget);
  const handleAddClose = () => setAddAnchorEl(null);
  const addOpen = Boolean(addAnchorEl);

  const handleOptionsOpen = (event, reportId) => {
    setOptionsAnchorEl((prev) => ({ ...prev, [reportId]: event.currentTarget }));
  };

  const handleIconClick = (index) => {
    // Alternamos entre los dos iconos al hacer clic
    setSelectedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleOptionsClose = (reportId) => {
    setOptionsAnchorEl((prev) => ({ ...prev, [reportId]: null }));
  };
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const transformDict = (dict) => {
    const nuevaEstructura = {
      0: 'listadoReactivos',
      1: 'listadoEntradasSalidas',
      2: 'listadoEquipos',
      3: 'listadoServicios',
      4: 'listadoUsos',
      5: 'graficaCategoriasReactivos',
      6: 'graficaEntradasSalidas',
      7: 'graficaReactivosAgotados',
      8: 'graficaUsodeEquipos',
      9: 'graficaServicioEquipos'
    };

    const resultado = {};

    for (const [numero, nuevaLlave] of Object.entries(nuevaEstructura)) {
      const num = Number(numero);
      if (dict.hasOwnProperty(num)) {
        resultado[nuevaLlave] = dict[num];
      } else {
        resultado[nuevaLlave] = false;
      }
    }

    return resultado;
  }

  const handleCreateReport = async () => {
    await fetchCreateReport(transformDict(selectedItems))
    await queryClient.invalidateQueries(["reports"]);
    handleModalClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>
              <img
                src="/svgs/plus-green.svg"
                alt="Agregar"
                width={25}
                className="m-auto cursor-pointer"
                onClick={handleAddOpen}
              />
              <Popover
                open={addOpen}
                anchorEl={addAnchorEl}
                onClose={() => {
                  setDisableAnimationOnClose(false);
                  handleAddClose();
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                PaperProps={{
                  sx: {
                    boxShadow: 2,
                    borderRadius: "10px",
                    padding: "6px",
                    backgroundColor: "#f5f5f5",
                  },
                }}
                TransitionProps={{
                  timeout: disableAnimationOnClose ? 0 : undefined,
                }}
              >
                <Button
                  onClick={() => {
                    setDisableAnimationOnClose(true);
                    setAddAnchorEl(null);
                    handleModalOpen();
                  }}
                  startIcon={<img src="/svgs/plus-sign.svg" alt="icono" width={16} />}
                  sx={buttonStyle}
                >
                  Crear reporte
                </Button>
              </Popover>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => {
            const open = Boolean(optionsAnchorEl[report._id]);
            return (
              <StyledTableRow key={report._id}>
                <StyledTableCell sx={{ width: "50.63%"}}>
                  {editingReportId === report._id ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            style={{
                              height: "32px",
                              fontSize: "14px",
                              padding: "4px 8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              flexGrow: 1,
                            }}
                        />
                        <Button
                            onClick={() => setEditingReportId(null)}
                            sx={{
                              minWidth: "32px",
                              height: "32px",
                              backgroundColor: "#f5f5f5",
                              color: "#555",
                              borderRadius: "4px",
                              padding: "0",
                              "&:hover": { backgroundColor: "#e0e0e0" },
                            }}
                        >
                          ✖
                        </Button>
                        <Button
                            onClick={async () => {
                              await fetchChangeReportName(report._id, editingName);
                              await queryClient.invalidateQueries(["reports"]);
                              setEditingReportId(null);
                            }}
                            sx={{
                              minWidth: "32px",
                              height: "32px",
                              backgroundColor: "#4CAF50",
                              color: "white",
                              borderRadius: "4px",
                              padding: "0",
                              "&:hover": { backgroundColor: "#45a049" },
                            }}
                        >
                          ✔
                        </Button>
                      </div>
                  ) : (
                      report.nombre
                  )}
                </StyledTableCell>
                <StyledTableCell>{formatearFecha(report.fechaGeneracion)}</StyledTableCell>
                <StyledTableCell>
                  <span style={getEstadoEstilo(report.idEstadoReporte.nombre)}>
                    {report.idEstadoReporte.nombre}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src="/svgs/options-vertical.svg"
                    alt="Opciones"
                    width={25}
                    className="m-auto cursor-pointer"
                    onClick={(e) => handleOptionsOpen(e, report._id)}
                  />
                  <Popover
                    open={open}
                    anchorEl={optionsAnchorEl[report._id]}
                    onClose={() => handleOptionsClose(report._id)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    PaperProps={{
                      sx: {
                        boxShadow: 2,
                        borderRadius: "10px",
                        padding: "8px",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      },
                    }}
                  >
                    <Button
                      startIcon={<img src="/svgs/download copy.svg" alt="Descargar" width={16} />}
                      sx={buttonStyle}
                      onClick={async () => {
                        await descargarConFetch(report.urlReporte, report.nombre);
                        handleOptionsClose(report._id)
                      }}
                    >
                      Descargar
                    </Button>
                    <a href={report.urlReporte} target="_blank" rel="noopener noreferrer">
                    <Button
                      startIcon={<img src="/svgs/eye-gray.svg" alt="Vista previa" width={16} />}
                      sx={buttonStyle}
                      onClick={() => handleOptionsClose(report._id)}
                    >
                      Vista previa
                    </Button>
                    </a>
                    <Button
                      startIcon={<img src="/svgs/rename.svg" alt="Renombrar" width={20} />}
                      sx={buttonStyle}
                      onClick={() => {
                        setEditingReportId(report._id);
                        setEditingName(report.nombre);
                        handleOptionsClose(report._id);
                      }}

                    >
                      Renombrar
                    </Button>

                    <Button
                      startIcon={<img src="/svgs/trash-red2.svg" alt="Eliminar" width={16} />}
                      sx={{ ...buttonStyle, color: "#b00020" }}
                      onClick={async () => {
                        setReportToDelete(report);
                        handleOptionsClose(report._id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </Popover>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>

      {openModal && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>Contenido del reporte</h2>
            <div style={{ textAlign: "left", marginBottom: "30px" }}>
              {[
                "Listado completo de reactivos",
                "Listado de entradas y salidas en los últimos 30 días",
                "Listado completo de equipos de laboratorio",
                "Listado de servicios a equipos en los últimos 30 días",
                "Listado de uso de equipos en los últimos 30 días",
                "Gráfica de porcentaje de reactivos por categoría",
                "Gráfica de entradas vs salidas de los últimos 30 días",
                "Gráfica de porcentaje de reactivos agotados",
                "Gráfica de tendencia de uso de equipo en los últimos 30 días",
                "Gráfica de tendencia de servicio de equipo en los últimos 30 días",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={selectedItems[index] ? "svgs/rectangle-X.svg" : "svgs/rectangle.svg"}
                    alt="icon"
                    width={15}
                    height={15}
                    style={{ marginRight: "10px", marginTop: "5px" }}
                    onClick={() => handleIconClick(index)}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <Button
            onClick={async () => {
              handleModalClose();
            }}
            sx={{
              backgroundColor: "white",
              color: "black", 
              fontWeight: "bold",
              border: "1px solid black", 
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              borderRadius: "8px",
              padding: "8px 20px",
            }}
          >
            Cancelar
          </Button>
              <Button
                onClick={handleCreateReport}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#43A047" },
                  borderRadius: "8px",
                  padding: "8px 20px",
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </TableContainer>
  );
}

const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "72px",
  zIndex: 9999 // :O
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "377px",
  height: "691px",
};
