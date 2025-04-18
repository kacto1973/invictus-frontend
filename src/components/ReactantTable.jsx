import * as React from "react";
import { useEffect, useState } from "react";
import { rgbToHex, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../services/fetchers.js";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

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

function openDetails(reactant) {
  console.log(reactant);
}

export default function CustomizedTables({ onReactantClick, filter }) {
  /* useStates */
  const [showAlert, setShowAlert] = useState(false);

  /* tanstack */
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchInventory,
  });

  /*filtro */
  const newData = data?.filter((reactant) =>
    reactant?.nombre?.toLowerCase().includes(filter?.toLowerCase())
  );

  /*useEffect */
  useEffect(() => {
    if (newData?.length === 0) {
      setShowAlert(true);
      console.log("No hay resultados");
    } else {
      setShowAlert(false);
    }
  }, [newData]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Gabinete</StyledTableCell>
            <StyledTableCell>Información</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newData?.map((reactant) => (
            <StyledTableRow key={reactant?.nombre}>
              <StyledTableCell>{reactant?.nombre}</StyledTableCell>
              <StyledTableCell>{reactant?.idGabinete?.nombre}</StyledTableCell>
              <StyledTableCell>
                <img
                  src="svgs/details.svg"
                  alt="icon"
                  width={25}
                  className="m-auto cursor-pointer"
                  onClick={() => {
                    onReactantClick(reactant);
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {showAlert && (
        <div className="pt-3 bg-[#EDEDED]">
          <Alert variant="filled" severity="info">
            No hay resultados con el nombre escrito.
          </Alert>
        </div>
      )}
    </TableContainer>
  );
}
