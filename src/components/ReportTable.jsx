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
import { useState } from "react";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C796EB",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  let backgroundColor = "inherit";
  switch (estado) {
    case "Completado":
      backgroundColor = "#d8ecdc";
      break;
    case "Error":
      backgroundColor = "#ffd4dc";
      break;
    case "En progreso":
      backgroundColor = "#fcf4cc";
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

export default function CustomizedTables({ onReportClick, reports }) {
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState({});
  const [selectedItems, setSelectedItems] = useState({}); 
  const [openModal, setOpenModal] = useState(false);


  const handleAddOpen = (event) => setAddAnchorEl(event.currentTarget);
  const handleAddClose = () => setAddAnchorEl(null);
  const addOpen = Boolean(addAnchorEl);

  const handleOptionsOpen = (event, reportId) => {
    setOptionsAnchorEl((prev) => ({ ...prev, [reportId]: event.currentTarget }));
  };

  const handleOptionsClose = (reportId) => {
    setOptionsAnchorEl((prev) => ({ ...prev, [reportId]: null }));
  };

  const handleIconClick = (index) => {
  
    setSelectedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleCreateReport = () => {
    alert("Se ha guardado el reporte");
  
    handleModalClose();
  };
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>
              <img
                src="svgs/plus-green.svg"
                alt="Agregar"
                width={25}
                className="m-auto cursor-pointer"
                onClick={handleAddOpen}
              />
              <Popover
                open={addOpen}
                anchorEl={addAnchorEl}
                onClose={handleAddClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                  sx: {
                    boxShadow: 2,
                    borderRadius: "10px",
                    padding: "6px",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Button
                  onClick={handleModalOpen}
                  startIcon={<img src="svgs/plus-sign.svg" alt="icono" width={16} />}
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
            const open = Boolean(optionsAnchorEl[report.id]);
            return (
              <StyledTableRow key={report.id}>
                <StyledTableCell>{report.nombre}</StyledTableCell>
                <StyledTableCell>{report.fecha}</StyledTableCell>
                <StyledTableCell>
                  <span style={getEstadoEstilo(report.estado)}>{report.estado}</span>
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src="svgs/options-vertical.svg"
                    alt="Opciones"
                    width={25}
                    className="m-auto cursor-pointer"
                    onClick={(e) => handleOptionsOpen(e, report.id)}
                  />
                  <Popover
                    open={open}
                    anchorEl={optionsAnchorEl[report.id]}
                    onClose={() => handleOptionsClose(report.id)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
                      startIcon={<img src="svgs/download copy.svg" alt="Descargar" width={16} />}
                      sx={buttonStyle}
                      onClick={() => handleOptionsClose(report._id)}
                    >
                      Descargar
                    </Button>
                <Button
                  startIcon={
                  <img
                  src="svgs/eye-gray.svg"
                  alt="Vista previa"
                  width={16}
                  height={16}
                />
               }
              sx={buttonStyle}
              onClick={() => {
                console.log("Vista previa:", report);
                handleOptionsClose(report.id);
              }}
            >
              Vista previa
            </Button>

            <Button
           startIcon={<img src="svgs/rename.svg" alt="Renombrar" width={20} />}
            sx={buttonStyle}
              onClick={() => handleRenameReport(report._id)}
             >
            Renombrar
            </Button>

              <Button
                startIcon={
                  <img
                    src="svgs/trash-red2.svg"
                    alt="Eliminar"
                    width={16}
                    height={16}
                  />
                }
                sx={{
                  ...buttonStyle,
                  color: "#b00020",
                }}
                onClick={() => {
                  console.log("Eliminar:", report);
                  handleOptionsClose(report.id);
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
            onClick={handleModalClose}
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
  paddingTop: "72px"
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