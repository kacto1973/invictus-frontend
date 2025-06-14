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
];

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
