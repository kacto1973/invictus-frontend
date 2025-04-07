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

  const handleAddOpen = (event) => setAddAnchorEl(event.currentTarget);
  const handleAddClose = () => setAddAnchorEl(null);
  const addOpen = Boolean(addAnchorEl);

  const handleOptionsOpen = (event, reportId) => {
    setOptionsAnchorEl((prev) => ({ ...prev, [reportId]: event.currentTarget }));
  };

  const handleOptionsClose = (reportId) => {
    setOptionsAnchorEl((prev) => ({ ...prev, [reportId]: null }));
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
                  onClick={() => {
                    onReportClick();
                    handleAddClose();
                  }}
                  startIcon={
                    <img
                      src="svgs/plus-sign.svg"
                      alt="icono"
                      width={16}
                    />
                  }
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
              startIcon={
                <img
                  src="svgs/regenerate.svg"
                  alt="Regenerar"
                  width={16}
                  height={16}
                />
              }
              sx={buttonStyle}
              onClick={() => {
                console.log("Regenerar:", report);
                handleOptionsClose(report.id);
              }}
            >
              Regenerar
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
    </TableContainer>
  );
}
