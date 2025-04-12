import * as React from "react";
import { rgbToHex, styled } from "@mui/material/styles";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/*dummy data */
const reactants = [
  {
    nombre: "Ácido Clorhídrico",
    movimiento: "Entrada",
    cantidad: 10,
    fecha: "2025-04-01",
  },
  { nombre: "Etanol", movimiento: "Salida", cantidad: 5, fecha: "2025-04-02" },
  { nombre: "Sodio", movimiento: "Entrada", cantidad: 15, fecha: "2025-04-03" },
  { nombre: "Potasio", movimiento: "Salida", cantidad: 3, fecha: "2025-04-04" },
  {
    nombre: "Agua Destilada",
    movimiento: "Entrada",
    cantidad: 25,
    fecha: "2025-04-05",
  },
  {
    nombre: "Bicarbonato de Sodio",
    movimiento: "Salida",
    cantidad: 7,
    fecha: "2025-04-06",
  },
  {
    nombre: "Ácido Acético",
    movimiento: "Entrada",
    cantidad: 12,
    fecha: "2025-04-07",
  },
  {
    nombre: "Hidróxido de Sodio",
    movimiento: "Salida",
    cantidad: 4,
    fecha: "2025-04-08",
  },
  {
    nombre: "Cloroformo",
    movimiento: "Entrada",
    cantidad: 8,
    fecha: "2025-04-09",
  },
  {
    nombre: "Peróxido de Hidrógeno",
    movimiento: "Salida",
    cantidad: 6,
    fecha: "2025-04-10",
  },
  {
    nombre: "Glicerina",
    movimiento: "Entrada",
    cantidad: 11,
    fecha: "2025-04-11",
  },
  { nombre: "Metanol", movimiento: "Salida", cantidad: 9, fecha: "2025-04-12" },
  {
    nombre: "Ácido Nítrico",
    movimiento: "Entrada",
    cantidad: 14,
    fecha: "2025-04-13",
  },
  {
    nombre: "Amoniaco",
    movimiento: "Salida",
    cantidad: 5,
    fecha: "2025-04-14",
  },
  { nombre: "Fenol", movimiento: "Entrada", cantidad: 6, fecha: "2025-04-15" },
  { nombre: "Acetona", movimiento: "Salida", cantidad: 8, fecha: "2025-04-16" },
  {
    nombre: "Benceno",
    movimiento: "Entrada",
    cantidad: 10,
    fecha: "2025-04-17",
  },
  { nombre: "Tolueno", movimiento: "Salida", cantidad: 7, fecha: "2025-04-18" },
  {
    nombre: "Isopropanol",
    movimiento: "Entrada",
    cantidad: 9,
    fecha: "2025-04-19",
  },
  {
    nombre: "Ácido Sulfúrico",
    movimiento: "Salida",
    cantidad: 4,
    fecha: "2025-04-20",
  },
];

export default function CustomizedTables({ onReactantClick }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Movimiento</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reactants.map((reactant) => (
            <StyledTableRow key={reactant.nombre}>
              <StyledTableCell>{reactant.nombre}</StyledTableCell>
              <StyledTableCell>{reactant.movimiento}</StyledTableCell>
              <StyledTableCell>{reactant.cantidad}</StyledTableCell>
              <StyledTableCell>{reactant.fecha}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
