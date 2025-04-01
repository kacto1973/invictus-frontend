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
    id: "R001",
    gabinete: "A1",
    marca: "Sigma",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Ácido Sulfúrico",
    esPeligroso: true,
    cantidad: 500,
  },
  {
    id: "R002",
    gabinete: "B2",
    marca: "Merck",
    unidadMedida: "g",
    estadoFisico: "Sólido",
    nombre: "Sulfato de Cobre",
    esPeligroso: false,
    cantidad: 250,
  },
  {
    id: "R003",
    gabinete: "C3",
    marca: "Fisher",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Ethanol",
    esPeligroso: true,
    cantidad: 1000,
  },
  {
    id: "R004",
    gabinete: "D4",
    marca: "PanReac",
    unidadMedida: "g",
    estadoFisico: "Polvo",
    nombre: "Nitrato de Plata",
    esPeligroso: true,
    cantidad: 100,
  },
  {
    id: "R005",
    gabinete: "E5",
    marca: "J.T. Baker",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Acetona",
    esPeligroso: true,
    cantidad: 750,
  },
  {
    id: "R006",
    gabinete: "F6",
    marca: "Sigma",
    unidadMedida: "g",
    estadoFisico: "Sólido",
    nombre: "Cloruro de Sodio",
    esPeligroso: false,
    cantidad: 500,
  },
  {
    id: "R007",
    gabinete: "G7",
    marca: "Merck",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Ácido Clorhídrico",
    esPeligroso: true,
    cantidad: 1000,
  },
  {
    id: "R008",
    gabinete: "H8",
    marca: "Fisher",
    unidadMedida: "g",
    estadoFisico: "Sólido",
    nombre: "Óxido de Calcio",
    esPeligroso: false,
    cantidad: 300,
  },
  {
    id: "R009",
    gabinete: "I9",
    marca: "PanReac",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Glicerina",
    esPeligroso: false,
    cantidad: 500,
  },
  {
    id: "R010",
    gabinete: "J10",
    marca: "J.T. Baker",
    unidadMedida: "g",
    estadoFisico: "Polvo",
    nombre: "Óxido de Zinc",
    esPeligroso: false,
    cantidad: 400,
  },
  {
    id: "R011",
    gabinete: "K11",
    marca: "Sigma",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Tolueno",
    esPeligroso: true,
    cantidad: 600,
  },
  {
    id: "R012",
    gabinete: "L12",
    marca: "Merck",
    unidadMedida: "g",
    estadoFisico: "Sólido",
    nombre: "Carbonato de Sodio",
    esPeligroso: false,
    cantidad: 700,
  },
  {
    id: "R013",
    gabinete: "M13",
    marca: "Fisher",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Metanol",
    esPeligroso: true,
    cantidad: 850,
  },
  {
    id: "R014",
    gabinete: "N14",
    marca: "PanReac",
    unidadMedida: "g",
    estadoFisico: "Polvo",
    nombre: "Sulfato de Aluminio",
    esPeligroso: false,
    cantidad: 500,
  },
  {
    id: "R015",
    gabinete: "O15",
    marca: "J.T. Baker",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Benceno",
    esPeligroso: true,
    cantidad: 450,
  },
  {
    id: "R016",
    gabinete: "P16",
    marca: "Sigma",
    unidadMedida: "g",
    estadoFisico: "Sólido",
    nombre: "Óxido de Hierro",
    esPeligroso: false,
    cantidad: 550,
  },
  {
    id: "R017",
    gabinete: "Q17",
    marca: "Merck",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Cloroformo",
    esPeligroso: true,
    cantidad: 300,
  },
  {
    id: "R018",
    gabinete: "R18",
    marca: "Fisher",
    unidadMedida: "g",
    estadoFisico: "Polvo",
    nombre: "Fosfato de Calcio",
    esPeligroso: false,
    cantidad: 200,
  },
  {
    id: "R019",
    gabinete: "S19",
    marca: "PanReac",
    unidadMedida: "ml",
    estadoFisico: "Líquido",
    nombre: "Ácido Nítrico",
    esPeligroso: true,
    cantidad: 700,
  },
  {
    id: "R020",
    gabinete: "T20",
    marca: "J.T. Baker",
    unidadMedida: "g",
    estadoFisico: "Sólido",
    nombre: "Permanganato de Potasio",
    esPeligroso: true,
    cantidad: 250,
  },
];

function openDetails(reactant) {
  console.log(reactant);
}

export default function CustomizedTables({ onReactantClick }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Gabinete</StyledTableCell>
            <StyledTableCell>Información</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reactants.map((reactant) => (
            <StyledTableRow key={reactant.nombre}>
              <StyledTableCell>{reactant.nombre}</StyledTableCell>
              <StyledTableCell>{reactant.gabinete}</StyledTableCell>
              <StyledTableCell>
                <img
                  src="svgs/details.svg"
                  alt="icon"
                  width={25}
                  className="m-auto cursor-pointer"
                  onClick={() => onReactantClick(reactant)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
