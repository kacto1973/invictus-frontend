import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DateTime } from "luxon";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0E2C5B",
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

export default function CustomizedTables({ transactions }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table
        stickyHeader={true}
        sx={{ minWidth: 300 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Movimiento</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Descripción</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => {
            const formattedDate = DateTime.fromISO(transaction?.fecha)
              .setZone("America/Hermosillo")
              .toFormat("yyyy-MM-dd");

            return (
              <StyledTableRow key={transaction?._id}>
                <StyledTableCell>
                  {transaction?.reactivo?.nombre}
                </StyledTableCell>
                <StyledTableCell>{transaction?.tipoMovimiento}</StyledTableCell>
                <StyledTableCell>{transaction?.cantidad}</StyledTableCell>
                <StyledTableCell>{formattedDate}</StyledTableCell>
                <StyledTableCell>{transaction?.descripcion}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
