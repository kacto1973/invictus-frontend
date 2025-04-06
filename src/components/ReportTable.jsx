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

export default function CustomizedTables({ onReportClick, reports}) {
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
                <span style={getEstadoEstilo(report.estado)}>{report.estado}</span>
              </StyledTableCell>
              <StyledTableCell>
                <img
                  src="svgs/options-vertical.svg"
                  alt="Opciones"
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
