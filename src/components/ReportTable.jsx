import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

/* Dummy data */
const reports = [
  { id: "RP001",
    nombre: "Reporte 11-03-25", 
    fecha: "11/03/25", 
    estado: "Completado" },

  { id: "RP002", 
    nombre: "Hola", 
    fecha: "10/03/25", 
    estado: "Completado" },

  { id: "RP003", 
    nombre: "Este no se puede leer", 
    fecha: "10/03/25", 
    estado: "Error" },

  { id: "RP004", 
    nombre: "Reporte 12-03-25", 
    fecha: "02/02/25", 
    estado: "Completado" },

  { id: "RP005", 
    nombre: "Reporte 18-03-25", 
    fecha: "18/03/25", 
    estado: "En progreso" },

  { id: "RP006", 
    nombre: "Reporte 19-03-25", 
    fecha: "19/03/25", 
    estado: "Completado" },

  { id: "RP007", 
    nombre: "Reporte 20-03-25", 
    fecha: "20/03/25", 
    estado: "Completado" },

  { id: "RP008", 
    nombre: "Reporte 20-03-25", 
    fecha: "20/03/25", 
    estado: "Error" }

];


const getEstadoEstilo = (estado) => {
  let backgroundColor = "inherit";
  switch (estado) {
    case "Completado":
      backgroundColor = "#d8ecdc"; // verde del figma
      break;
    case "Error":
      backgroundColor = "#ffd4dc"; // rojo del figma
      break;
    case "En progreso":
      backgroundColor = "#fcf4cc"; // amarillo figma
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

export default function CustomizedTables({ onReportClick }) {
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
                  alt="icon"
                  width={25}
                  className="m-auto cursor-pointer"
                  onClick={() => onReportClick()}
                />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <StyledTableRow key={report.id}>
              <StyledTableCell>{report.nombre}</StyledTableCell>
              <StyledTableCell>{report.fecha}</StyledTableCell>
              <StyledTableCell>
                <span style={getEstadoEstilo(report.estado)}>
                  {report.estado}
                </span>
              </StyledTableCell>
              <StyledTableCell>
                <img
                  src="svgs/options-vertical.svg"
                  alt="icon"
                  width={25}
                  className="m-auto cursor-pointer"
                  onClick={() => onReportClick(report)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
